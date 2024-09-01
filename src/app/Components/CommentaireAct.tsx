import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { IComments } from '@/Models/Commentaire';
import { AiOutlineDelete } from "react-icons/ai";
const CommentaireAct: React.FC = () => {
    const { id: actId } = useParams(); // LogId pour l'annonce
    const { data } = useSession();
    const UserName = data?.user.fullName;
    const clientId = data?.user._id;

    const [commentContent, setCommentContent] = useState<string>('');
    const [comments, setComments] = useState<IComments[]>([]);

    const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCommentContent(e.target.value);
    };

    const handleCommentSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/Commentaire', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    clientId,
                    actId,
                    Content: commentContent,
                }),
            });

            if (response.ok) {
                const result = await response.json();
                setComments([...comments, result.data]);
                setCommentContent('');
            } else {
                console.error('Erreur lors de la création du commentaire');
            }
        } catch (error) {
            console.error('Erreur:', error);
        }
    };
    const handleCancel = async (idComments: string) => {
        try {
          const response = await fetch(`/api/Commentaire/${idComments}`, {
            method: 'DELETE',
          });
          if (!response.ok) {
            throw new Error('Failed to delete comments');
          }
          
          // Remove the deleted booking from the state
          setComments(prevHist => prevHist.filter(comm => comm._id !== idComments));
        } catch (error) {
          console.error('Error cancelling comment:', error);
        }
      };
    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await fetch(`/api/Commentaire/${actId}`);
                const result = await response.json();
                if (result.success) {
                    setComments(result.data);
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des commentaires:', error);
            }
        };

        fetchComments();
    }, [actId]);

    return (
        <div className="comments-section bg-gray-50 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">{comments.length} Comments</h2>

            {/* Formulaire d'ajout de commentaire */}
            <form onSubmit={handleCommentSubmit} className="my-4">
                <textarea
                    value={commentContent}
                    onChange={handleCommentChange}
                    placeholder="Write a comment..."
                    className="w-full p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    rows={3}
                    required
                />
                <button type="submit" className="mt-2 px-4 py-2 bg-primary  text-white rounded-lg hover:bg-primary transition-colors">
                    send Comment
                </button>
            </form>

            {/* Affichage des commentaires */}
            <div className="comments-list space-y-4">
            {comments.length > 0 ? (
    comments.map((comment, index) => (
        <div key={index} className="comment-item p-4 bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3">
                <div className="bg-second text-white rounded-full w-10 h-10 flex items-center justify-center">
                    {UserName? UserName[0] : 'A'}
                </div>
                <div>
                    <p className="font-semibold text-gray-800">
                        {comment.clientId?.fullName || 'User '}
                    </p>
                    <p className="text-gray-600 text-sm">{new Date(comment.created_At).toLocaleString()}</p>
                </div>
            </div>
            <p className="mt-2 text-gray-700">{comment.Content}</p>
            <button 
            onClick={()=>{
                handleCancel(comment._id as string)
            }}
            >
            <AiOutlineDelete />
            </button>
        </div>
    ))
) : (
    <p className="text-gray-500">No comments yet.</p>
)}

            </div>
        </div>
    );
};

export default CommentaireAct;
