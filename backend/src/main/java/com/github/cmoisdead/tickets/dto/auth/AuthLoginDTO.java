package com.github.cmoisdead.tickets.dto.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;

public record AuthLoginDTO(
    @NotNull @Email String email,
    @NotNull String password) {
}
