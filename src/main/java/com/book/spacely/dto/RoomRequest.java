package com.book.spacely.dto;

import lombok.Data;

@Data
public class RoomRequest {
    private String name;
    private String description;
    private Integer capacity;
}
