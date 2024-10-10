package com.github.cmoisdead.tickets.model;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Payment {

  private String transactionId;
  private Methods method; // "credit_card", "paypal", "ideal"
  private Status status; // "approved", "declined", "pending"
  private LocalDateTime date;
  private double amount;
  private String parameters;
  private String body;
}

enum Methods {
  // TODO: Update methods to the correct ones...
  credit_card, paypal, ideal
}

enum Status {
  approved, declined, pending
}
