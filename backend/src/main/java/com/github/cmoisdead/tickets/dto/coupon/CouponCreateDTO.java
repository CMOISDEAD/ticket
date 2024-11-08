package com.github.cmoisdead.tickets.dto.coupon;

import java.time.LocalDate;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;

@Builder
public record CouponCreateDTO(
                @NotNull String code,
                @NotNull String name,
                @NotNull String description,
                @NotNull String userId,
                @NotNull boolean isUsed,
                @NotNull double discount,
                @NotNull LocalDate expiryDate) {
}
