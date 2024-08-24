package com.github.cmoisdead.tickets.dto;

import java.time.LocalDate;

import jakarta.validation.constraints.NotNull;

public record CouponCreateDTO(
    @NotNull String code,
    @NotNull String name,
    @NotNull String userId,
    @NotNull boolean isUsed,
    @NotNull double discount,
    @NotNull LocalDate expiryDate) {
}
