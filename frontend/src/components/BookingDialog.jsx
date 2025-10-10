import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createBooking } from "@/services/bookingService";

const BookingDialog = ({ room, isOpen, onOpenChange, onSuccess }) => {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirmBooking = async () => {
    setIsLoading(true);
    setError("");
    try {
      const formattedStartTime = startTime + ":00";
      const formattedEndTime = endTime + ":00";

      await createBooking(room.id, formattedStartTime, formattedEndTime);
      onSuccess(room.name);
      onOpenChange(false);
    } catch (err) {
      console.error("booking gagal:", err);
      setError(err.response?.data?.message || "slot sudah dipesan.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenChange = (open) => {
    if (!open) {
      setStartTime("");
      setEndTime("");
      setError("");
    }
    onOpenChange(open);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Book: {room?.name}</DialogTitle>
          <DialogDescription>choose date and time</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {error && <p className="text-sm font-medium text-destructive">{error}</p>}
          <div className="space-y-2">
            <Label htmlFor="startTime">Start Time</Label>

            <Input
              id="startTime"
              type="datetime-local"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="endTime">End Time</Label>

            <Input id="endTime" type="datetime-local" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleConfirmBooking} disabled={isLoading}>
            {isLoading ? "Booking..." : "Confirm Booking"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BookingDialog;
