package com.book.spacely.service;

import com.book.spacely.dto.BookingRequest;
import com.book.spacely.dto.BookingResponse;
import com.book.spacely.entity.Booking;
import com.book.spacely.entity.Room;
import com.book.spacely.entity.User;
import com.book.spacely.repository.BookingRepository;
import com.book.spacely.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BookingService {

    private final BookingRepository bookingRepository;
    private final RoomRepository roomRepository;

    @Transactional
    public BookingResponse createBooking(BookingRequest request){
        User currentUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        Room room = roomRepository.findById(request.getRoomId())
                .orElseThrow(() -> new IllegalStateException("Room not found"));

        List<Booking> overlappingBookings = bookingRepository.findOverlappingBookings(
                request.getRoomId(),
                request.getStartTime(),
                request.getEndTime()
        );

        if(!overlappingBookings.isEmpty()){
            throw new IllegalStateException("Room is already booked for the selected time slot!");
        }

        Booking booking = Booking.builder()
                .user(currentUser)
                .room(room)
                .startTime(request.getStartTime())
                .endTime(request.getEndTime())
                .build();

        Booking savedBooking = bookingRepository.save(booking);

        return BookingResponse.builder()
                .id(savedBooking.getId())
                .roomName(savedBooking.getRoom().getName())
                .userName(savedBooking.getUser().getName())
                .startTime(savedBooking.getStartTime())
                .endTime(savedBooking.getEndTime())
                .build();
    }
}
