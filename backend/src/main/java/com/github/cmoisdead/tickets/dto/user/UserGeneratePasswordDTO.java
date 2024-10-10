package com.github.cmoisdead.tickets.dto.user;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;

public record UserGeneratePasswordDTO(
    @NotNull @Email() String email) {
}
