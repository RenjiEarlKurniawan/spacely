package com.book.spacely.service;

import com.book.spacely.dto.RoomRequest;
import com.book.spacely.entity.Room;
import com.book.spacely.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


import java.util.List;

@Service
@RequiredArgsConstructor
public class RoomService {
    private final RoomRepository roomRepository;

    public Room createRoom(RoomRequest request){
        Room room = Room.builder()
                .name(request.getName())
                .description(request.getDescription())
                .capacity(request.getCapacity())
                .build();
        return roomRepository.save(room);
    }

    public List<Room> getAllRooms(){
        return roomRepository.findAll();
    }

    public Room getRoomById(Long id){
        return roomRepository.findById(id).orElseThrow(() -> new RuntimeException("Room not found"));
    }

    public Room updateRoom(Long id, RoomRequest request){
        Room room = getRoomById(id);
        room.setName(request.getName());
        room.setDescription(request.getDescription());
        room.setCapacity(request.getCapacity());
        return roomRepository.save(room);
    }

    public void deleteRoom(Long id){
        roomRepository.deleteById(id);
    }
}
