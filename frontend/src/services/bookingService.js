import apiClient from "./apiClient";

export const createBooking = async (roomId, startTime, endTime) => {
  const response = await apiClient.post("/bookings", {
    roomId,
    startTime,
    endTime,
  });
  return response.data;
};
