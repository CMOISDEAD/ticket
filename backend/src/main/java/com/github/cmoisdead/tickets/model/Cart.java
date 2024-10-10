package com.github.cmoisdead.tickets.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Cart {
  private String id;
  private String userId;
  private List<String> eventIds;
  private double totalPrice;
}
