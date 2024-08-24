package com.github.cmoisdead.tickets.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Item {
  private String id;
  private int units;
  private String eventid;
  private double price;
}