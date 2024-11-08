package com.github.cmoisdead.tickets.model;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
@Document(collection = "coupons")
public class Coupon {
  // TODO: replace userId with usersIds

  @Id
  @Builder.Default
  private String id = null;

  private String code;
  private String name;
  private String description;
  private String userId;
  private double discount;
  private boolean isUsed;
  private boolean isExpired;
  private boolean isGlobal;
  private LocalDate usedDate;
  private LocalDate expiryDate;

  private List<String> usedByUsers;
}
