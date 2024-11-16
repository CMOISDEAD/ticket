package com.github.cmoisdead.tickets.dto.coupon;

import jakarta.validation.constraints.NotNull;

public record CouponAddDTO(@NotNull String userId, @NotNull String code) {
}
