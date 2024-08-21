package com.github.cmoisdead.tickets.model;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
@Document(collection = "purchases")
public class Purchase {

  @Id
  private String id;

  private String userId;
  private double total;
  private LocalDateTime date;
  private boolean isCancelled;
  private Payment payment;
  private List<Item> items;
  private List<String> couponsIds;
}
