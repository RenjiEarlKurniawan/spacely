import { useEffect, useState } from "react";
import { getMyBookings } from "@/services/bookingService";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Spinner } from "@/components/ui/spinner";

const MyBookingPage = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMyBookings = async () => {
      try {
        const data = await getMyBookings();
        setBookings(data);
      } catch (err) {
        console.error("Gagal mengambil data booking:", err);
        setError("Gagal memuat data pemesanan Anda.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchMyBookings();
  }, []);

  if (isLoading) {
    return (
      <div className="container flex justify-center p-10">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return <div className="container p-10 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">My Bookings</h1>
      <Table>
        <TableCaption>{bookings.length > 0 ? "A list of your bookings." : "You have no bookings yet."}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Room</TableHead>
            <TableHead>Start Time</TableHead>
            <TableHead>End Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.map((booking) => (
            <TableRow key={booking.id}>
              <TableCell className="font-medium">{booking.roomName}</TableCell>
              <TableCell>{new Date(booking.startTime).toLocaleString()}</TableCell>
              <TableCell>{new Date(booking.endTime).toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default MyBookingPage;
