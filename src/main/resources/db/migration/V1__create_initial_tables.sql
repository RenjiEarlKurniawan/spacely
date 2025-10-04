-- Create table users
CREATE TABLE users(
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    role VARCHAR(20) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Crate table rooms
CREATE TABLE rooms(
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description text NOT NULL,
    capacity INTEGER NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create table bookings
CREATE TABLE bookings(
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    room_id BIGINT NOT NULL,
    start_time TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    end_time TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id),
    CONSTRAINT fk_room FOREIGN KEY(room_id) REFERENCES rooms(id)
);

-- Create index
CREATE INDEX idx_bookings_user_id ON bookings(user_id);
CREATE INDEX idx_bookings_room_id ON bookings(room_id);
