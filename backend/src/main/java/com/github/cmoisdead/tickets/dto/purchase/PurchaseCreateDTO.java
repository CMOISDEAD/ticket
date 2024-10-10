package com.github.cmoisdead.tickets.dto.purchase;

import java.time.LocalDateTime;
import java.util.List;

import com.github.cmoisdead.tickets.model.Item;

import jakarta.validation.constraints.NotNull;

public record PurchaseCreateDTO(
                                @NotNull String userId,
                                @NotNull double total,
                                @NotNull LocalDateTime date,
                                @NotNull List<Item> items) {
}
