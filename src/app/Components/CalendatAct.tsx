import React, { useState, useEffect } from "react";
import { IResa } from "@/Models/Resa";
import { useParams } from "next/navigation";
interface ListRoomPageProps {
  id: string;
}

const Calendar: React.FC<ListRoomPageProps> = ({ id }) => {
  const [Booking, setBooking] = useState<IResa[]>([]); // Réservations
  const { id: activityId } = useParams();
console.log("activityId for booking is ", activityId)
  // S'assurer que id est une chaîne de caractères
  const annonceId = Array.isArray(activityId) ? activityId[0] : activityId;

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  useEffect(() => {
    const getDataBook = async () => {
      try {
        console.log("Fetching data for annonceId:", annonceId);
        const res = await fetch(`http://localhost:3000/api/Bookings/`);
        if (!res.ok) {
          throw new Error("Failed to fetch with this URL!");
        }
        const result = await res.json();
        console.log("Fetch result:", result.data);

        if ( result.data) {
            console.log("Compiling ");
          // Filtrer les réservations pour l'annonce spécifique
          const res = result.data
          const filteredBookings = res.filter((booking: IResa) => {
            return booking.activityId && booking.activityId.toString() === annonceId;
          });
          
          console.log("Filtered Bookings:", filteredBookings);
          setBooking(filteredBookings);
        } else {
          throw new Error("Failed to fetch reservation data");
        }
      } catch (error) {
        console.error("Failed to fetch with this API!", error);
      }
    };
    if (annonceId) {
      getDataBook();
    }
  }, [annonceId]);

  const isDateBooked = (date: string) => {
    return Booking.some((booking) => {
      const startDate = new Date(booking.startDate);
      const endDate = new Date(booking.endDate);
      const currentDate = new Date(date);
      return currentDate >= startDate && currentDate <= endDate;
    });
  };

  const renderCalendar = () => {
    const currentYear = new Date().getFullYear();
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    return months.map((month, index) => {
      const daysInMonth = getDaysInMonth(index, currentYear);
      const days = [];

      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(currentYear, index, day).toISOString().split("T")[0];
        const isBooked = isDateBooked(date);

        days.push(
          <div
            key={day}
            className={`p-2 ${isBooked ? "bg-red-300" : "bg-gray-200"} rounded-md`}
          >
            {day}
          </div>
        );
      }

      return (
        <div key={month} className="m-5">
          <h2>{month}</h2>
          <div className="grid grid-cols-7 gap-2">
            {days}
          </div>
        </div>
      );
    });
  };

  return (
    <div>
      <div>
       
        {renderCalendar()}
      </div>
    </div>
  );
};

export default Calendar;
