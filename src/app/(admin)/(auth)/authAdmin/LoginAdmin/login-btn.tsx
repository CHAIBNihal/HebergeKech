'use client'
import { useSession, signIn, signOut } from "next-auth/react"
import "@/app/Components/admin/authAdmin/Login.css"
export default function Button() {
  
  const { data: session } = useSession()
  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}><a href="/Admin/Dashboard">Sign-In</a></button>
    </>
  )
} 