package com.github.cmoisdead.tickets.dto;

import java.time.LocalDate;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record UserCreateDTO(
        @NotNull String role,
        @NotNull String firstname,
        @NotNull String lastname,
        @NotNull @Min(4) @Max(12) String username,
        @NotNull @Min(4) @Max(12) String address,
        @NotNull @Email() String email,
        @NotNull String password,
        @NotNull LocalDate dateOfBirth) {
}
