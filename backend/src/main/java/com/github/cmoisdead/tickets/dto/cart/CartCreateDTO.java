package com.github.cmoisdead.tickets.dto.cart;

import java.util.List;

import jakarta.validation.constraints.NotNull;

public record CartCreateDTO(
    @NotNull String userId,
    @NotNull List<String> eventIds,
    @NotNull double totalPrice) {
}
