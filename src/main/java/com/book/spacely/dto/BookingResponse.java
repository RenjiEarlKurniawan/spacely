package com.book.spacely.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class BookingResponse {
    private Long id;
    private String roomName;
    private String userName;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
}
