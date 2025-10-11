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
import java.time.LocalDateTime;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BookingService {

    private final BookingRepository bookingRepository;
    private final RoomRepository roomRepository;

    @Transactional
    public BookingResponse createBooking(BookingRequest request) {

        LocalDateTime startDateTime = request.getStartTime();
        LocalDateTime endDateTime = request.getEndTime();

        if (startDateTime.isAfter(endDateTime) || startDateTime.isEqual(endDateTime)) {
            throw new IllegalStateException("End time must be after start time.");
        }


        User currentUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        Room room = roomRepository.findById(request.getRoomId())
                .orElseThrow(() -> new IllegalStateException("Room not found"));


        List<Booking> overlappingBookings = bookingRepository.findOverlappingBookings(
                request.getRoomId(),
                startDateTime,
                endDateTime
        );

        if (!overlappingBookings.isEmpty()) {
            throw new IllegalStateException("Room is already booked for the selected time slot.");
        }

        Booking booking = Booking.builder()
                .user(currentUser)
                .room(room)
                .startTime(startDateTime)
                .endTime(endDateTime)
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

    public List<BookingResponse> getAllBookings(){
        return bookingRepository.findAll().stream()
                .map(booking -> BookingResponse.builder()
                        .id(booking.getId())
                        .roomName(booking.getRoom().getName())
                        .userName(booking.getUser().getName())
                        .startTime(booking.getStartTime())
                        .endTime(booking.getEndTime())
                        .build())
                .toList();
    }

    public List<BookingResponse> getMyBookings() {

        User currentUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();


        List<Booking> bookings = bookingRepository.findAllByUserId(currentUser.getId());


        return bookings.stream()
                .map(booking -> BookingResponse.builder()
                        .id(booking.getId())
                        .roomName(booking.getRoom().getName())
                        .userName(booking.getUser().getName())
                        .startTime(booking.getStartTime())
                        .endTime(booking.getEndTime())
                        .build())
                .collect(Collectors.toList());
    }

    public void deleteBooking(Long bookingId){
        User currentUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        bookingRepository.delete(booking);
    }
}
