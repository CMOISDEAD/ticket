package com.github.cmoisdead.tickets.dto.purchase;

import java.time.LocalDateTime;
import java.util.List;

import com.github.cmoisdead.tickets.model.Item;
import com.github.cmoisdead.tickets.model.Payment;

import jakarta.validation.constraints.NotNull;

public record PurchaseCreateDTO(
                @NotNull String userId,
                @NotNull double total,
                @NotNull LocalDateTime date,
                @NotNull boolean isPaid,
                @NotNull Payment payment,
                @NotNull List<Item> items,
                @NotNull List<String> coupons) {
}
