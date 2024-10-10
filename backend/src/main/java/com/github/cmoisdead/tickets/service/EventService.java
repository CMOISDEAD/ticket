package com.github.cmoisdead.tickets.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.cmoisdead.tickets.dto.event.EventCreateDTO;
import com.github.cmoisdead.tickets.model.Event;
import com.github.cmoisdead.tickets.repository.EventRepository;

@Service
public class EventService {
  @Autowired
  private EventRepository eventRepository;

  public List<Event> findAll() {
    return eventRepository.findAll();
  }

  public Optional<Event> findById(String id) {
    return eventRepository.findById(id);
  }

  public Event save(EventCreateDTO dto) {
    Event event = Event.builder()
        .name(dto.name())
        .description(dto.description())
        .address(dto.address())
        .city(dto.city())
        .type(dto.type())
        .poster(dto.poster())
        .images(dto.images())
        .date(dto.date())
        .build();

    return eventRepository.save(event);
  }

  public void deleteById(String id) {
    eventRepository.deleteById(id);
  }
}
