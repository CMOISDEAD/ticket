package com.github.cmoisdead.tickets.dto.payment;

import jakarta.validation.constraints.NotNull;

public record PaymentPayDTO(
    @NotNull String id) {
}
