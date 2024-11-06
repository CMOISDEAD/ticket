package com.github.cmoisdead.tickets.model;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
@Document(collection = "events")
public class Event {

    @Id
    @Builder.Default
    private String id = null;

    private String name;
    private String description;
    private String address;
    private String city;
    private String type;
    private String poster;
    private Integer capacity;
    private List<String> images;
    private Float price;
    private String date;
}
