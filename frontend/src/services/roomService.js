import apiClient from "./apiClient";

export const getAllRooms = async () => {
  const response = await apiClient.get("/rooms");
  return response.data;
};

export const createRoom = async (roomData) => {
  const response = await apiClient.post("/rooms", roomData);
  return response.data;
};

export const deleteRoom = async (roomId) => {
  await apiClient.delete(`/rooms/${roomId}`);
};

export const updateRoom = async (roomId, roomData) => {
  const response = await apiClient.put(`/rooms/${roomId}`, roomData);
  return response.data;
};
