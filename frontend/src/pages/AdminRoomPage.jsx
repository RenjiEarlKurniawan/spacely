import { useEffect, useState } from "react";
import { getAllRooms, createRoom, deleteRoom, updateRoom } from "@/services/roomService";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Spinner } from "@/components/ui/spinner";
import { FaEdit, FaTrash } from "react-icons/fa";
import RoomDialog from "@/components/RoomDialog";

const AdminRoomPage = () => {
  const [rooms, setRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);

  const fetchRooms = async () => {
    setIsLoading(true);
    try {
      const data = await getAllRooms();
      setRooms(data);
    } catch (err) {
      setError("Gagal memuat data ruangan.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
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

  const handleDeleteRoom = async (roomId) => {
    if (window.confirm("Are you sure you want to delete this room?")) {
      try {
        await deleteRoom(roomId);
        setRooms((currentRooms) => currentRooms.filter((room) => room.id !== roomId));
      } catch (err) {
        console.error("Failed to delete room:", err);
        alert("Failed to delete room.");
      }
    }
  };

  const handleSaveRoom = async (data) => {
    try {
      if (editingRoom) {
        await updateRoom(editingRoom.id, data);
      } else {
        await createRoom(data);
      }
      closeDialog();
      fetchRooms();
    } catch (err) {
      console.error("Failed to save room:", err);
      alert("Failed to save room.");
    }
  };

  const openEditDialog = (room) => {
    setEditingRoom(room);
    setIsDialogOpen(true);
  };

  const openAddDialog = () => {
    setEditingRoom(null);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setEditingRoom(null);
  };

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Rooms</h1>
        <Button onClick={openAddDialog}>+ Add New Room</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Capacity</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rooms.map((room) => (
            <TableRow key={room.id}>
              <TableCell className="font-medium">{room.name}</TableCell>
              <TableCell>{room.capacity}</TableCell>
              <TableCell className="text-right space-x-2">
                <Button variant="outline" size="icon" onClick={() => openEditDialog(room)}>
                  <FaEdit />
                </Button>
                <Button onClick={() => handleDeleteRoom(room.id)} variant="destructive" size="icon">
                  <FaTrash />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <RoomDialog isOpen={isDialogOpen} onOpenChange={closeDialog} onSave={handleSaveRoom} roomData={editingRoom} />
    </div>
  );
};

export default AdminRoomPage;
