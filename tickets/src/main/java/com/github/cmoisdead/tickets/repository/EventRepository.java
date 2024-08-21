package com.github.cmoisdead.tickets.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.github.cmoisdead.tickets.model.Event;

public interface EventRepository extends MongoRepository<Event, String> {
  Optional<Event> findByName(String name);
}
