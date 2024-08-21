package com.github.cmoisdead.tickets.model;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
@Document(collection = "events")
public class Event {

  @Id
  private String id;

  private String name;
  private String description;
  private String address;
  private String city;
  private String type;
  private String poster;
  private List<String> images;
  private LocalDateTime date;
}
