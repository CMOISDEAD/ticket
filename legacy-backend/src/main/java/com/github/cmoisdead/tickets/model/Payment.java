package com.github.cmoisdead.tickets.model;

import java.time.LocalDateTime;

import com.github.cmoisdead.tickets.Enum.PaymentStatus;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Payment {

  private String id;
  private String transactionId;
  private Methods method; // "credit_card", "paypal", "ideal"
  private PaymentStatus status; // "approved", "declined", "pending"
  private LocalDateTime date;
  private double amount;
  private String parameters;
  private String body;
  private String authorizationCode;
  private float transactionValue;
  private String currency;
  private String statusDetail;
  private String state;
}

enum Methods {
  // TODO: Update methods to the correct ones...
  credit_card, paypal, ideal
}
