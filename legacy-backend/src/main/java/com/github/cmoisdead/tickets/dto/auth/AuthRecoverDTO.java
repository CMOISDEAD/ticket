package com.github.cmoisdead.tickets.dto.auth;

import jakarta.validation.constraints.NotNull;

public record AuthRecoverDTO(@NotNull String token, @NotNull String password) {
}
