package com.github.cmoisdead.tickets.model;

import java.util.List;

import org.springframework.data.annotation.Id;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class Cart {
  @Id
  @Builder.Default
  private String id = null;

  private String userId;
  private List<String> eventIds;
  private double totalPrice;
}
