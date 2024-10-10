package com.github.cmoisdead.tickets.dto.utils;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;

public record EmailDTO(
        @NotNull String subject,
        @NotNull String to,
        @NotNull String from,
        @NotNull String body) {
}