package com.github.cmoisdead.tickets.dto;

import java.time.LocalDateTime;

import jakarta.validation.constraints.NotNull;

public record EventCreateDTO(
    @NotNull String name,
    @NotNull String description,
    @NotNull String address,
    @NotNull String city,
    @NotNull String type,
    @NotNull String poster,
    @NotNull String[] images,
    @NotNull LocalDateTime date) {
}
