package com.github.cmoisdead.tickets.model;

import java.time.LocalDate;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
@Document(collection = "coupons")
public class Coupon {

  @Id
  private String id;

  private String code;
  private String name;
  private String userId;
  private boolean isUsed;
  private double discount;
  private LocalDate expiryDate;
}
