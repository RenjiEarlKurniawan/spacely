import { useEffect, useState } from "react";
import { getAllBookings, deleteBooking } from "@/services/bookingService";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";

const AdminBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await getAllBookings();
        setBookings(data);
      } catch (err) {
        setError("Gagal memuat data pemesanan.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchBookings();
  }, []);

  if (isLoading) {
    return (
      <div className="container p-10 flex justify-center">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return <div className="container p-10 text-red-500">{error}</div>;
  }

  const handleCancelBooking = async (bookingId) => {
    if (window.confirm("Are you sure you want to cancel this user's booking?")) {
      try {
        await deleteBooking(bookingId);
        setBookings((currentBookings) => currentBookings.filter((b) => b.id !== bookingId));
      } catch (err) {
        console.error("Failed to cancel booking:", err);
        alert("Failed to cancel booking.");
      }
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Manage All Bookings</h1>
      <Table>
        <TableCaption>A list of all bookings in the system.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Room</TableHead>
            <TableHead>Start Time</TableHead>
            <TableHead>End Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.map((booking) => (
            <TableRow key={booking.id}>
              <TableCell>{booking.userName}</TableCell>
              <TableCell>{booking.roomName}</TableCell>
              <TableCell>{new Date(booking.startTime).toLocaleString()}</TableCell>
              <TableCell>{new Date(booking.endTime).toLocaleString()}</TableCell>
              <TableCell className="text-right">
                <Button variant="destructive" size="sm" onClick={() => handleCancelBooking(booking.id)}>
                  Cancel
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminBookingsPage;
