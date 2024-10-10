package com.github.cmoisdead.tickets.dto;

public record MessageDTO<T>(
    boolean error,
    T response) {
}
