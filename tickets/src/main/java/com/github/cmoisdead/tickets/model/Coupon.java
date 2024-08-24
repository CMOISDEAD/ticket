package com.github.cmoisdead.tickets.model;

import java.time.LocalDate;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
@Document(collection = "coupons")
public class Coupon {

  @Id
  @Builder.Default
  private String id = null;

  private String code;
  private String name;
  private String userId;
  private boolean isUsed;
  private double discount;
  private LocalDate expiryDate;
}
