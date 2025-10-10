import { getAllRooms } from "@/services/roomService";
import { useEffect, useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import BookingDialog from "@/components/BookingDialog";

const HomePage = () => {
  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);

  const handleBooking = (room) => {
    setSelectedRoom(room);
    setIsDialogOpen(true);
  };

  const handleBookingSuccess = () => {
    alert("booking berhasil");
  };

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const data = await getAllRooms();
        setRooms(data);
      } catch (error) {
        console.error("gagal mengambil data rooms: ", error);
        setError("gagal memuat data.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchRooms();
  }, []);

  if (isLoading) {
    return (
      <div className="container flex justify-center items-center h-[90vh]">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="container mx-auto p-8 flex flex-col items-center">
      <h1 className="text-2xl mb-4">Available Rooms</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map((room) => (
          <Card
            key={room.id}
            className="flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
          >
            <CardHeader>
              <CardTitle>{room.name}</CardTitle>
              <CardDescription>Capacity: {room.capacity}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p>{room.description}</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full cursor-pointer" onClick={() => handleBooking(room)}>
                Book Now
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      {selectedRoom && (
        <BookingDialog
          room={selectedRoom}
          isOpen={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          onSuccess={handleBookingSuccess}
        />
      )}
    </div>
  );
};
export default HomePage;
