package com.github.cmoisdead.tickets.dto.cart;

import jakarta.validation.constraints.NotNull;

public record CartAddItemDTO(
    @NotNull String userId,
    @NotNull String eventId
    ){
}
