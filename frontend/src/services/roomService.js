import apiClient from "./apiClient";

export const getAllRooms = async () => {
  const response = await apiClient.get("/rooms");
  return response.data;
};
