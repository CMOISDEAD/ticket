package com.github.cmoisdead.tickets.model;

import java.time.LocalDateTime;
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
@Document(collection = "purchases")
public class Purchase {

  @Id
  @Builder.Default
  private String id = null;

  private String userId;
  private double total;
  private LocalDateTime date;
  private boolean isPaid;
  private Payment payment;
  private List<Item> items;

  @DBRef
  private List<Coupon> coupons;
}
