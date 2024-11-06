package com.github.cmoisdead.tickets.dto.event;

import java.time.LocalDateTime;

import jakarta.validation.constraints.NotNull;

public record EventCreateDTO(
                @NotNull String name,
                @NotNull String description,
                @NotNull String address,
                @NotNull String city,
                @NotNull String type,
                @NotNull String poster,
                @NotNull java.util.List<String> images,
                @NotNull float price,
                @NotNull String date) {
}
