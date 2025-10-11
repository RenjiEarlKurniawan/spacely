import apiClient from "./apiClient";

export const createBooking = async (roomId, startTime, endTime) => {
  const response = await apiClient.post("/bookings", {
    roomId,
    startTime,
    endTime,
  });
  return response.data;
};

export const getMyBookings = async () => {
  const response = await apiClient.get("/bookings/my-bookings");
  return response.data;
};

export const deleteBooking = async (bookingId) => {
  await apiClient.delete(`/bookings/${bookingId}`);
};
