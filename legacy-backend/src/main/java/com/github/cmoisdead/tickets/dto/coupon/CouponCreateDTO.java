package com.github.cmoisdead.tickets.dto.coupon;

import java.time.LocalDate;

import jakarta.annotation.Nullable;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Null;
import lombok.Builder;

@Builder
public record CouponCreateDTO(
                @NotNull String code,
                @NotNull String name,
                @NotNull String description,
                String userId,
                // @NotNull boolean isUsed,
                @NotNull double discount,
                @NotNull LocalDate expiryDate) {
}
