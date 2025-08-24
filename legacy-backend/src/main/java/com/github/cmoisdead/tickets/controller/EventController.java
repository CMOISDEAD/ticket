package com.github.cmoisdead.tickets.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.github.cmoisdead.tickets.dto.event.EventCreateDTO;
import com.github.cmoisdead.tickets.model.Event;
import com.github.cmoisdead.tickets.service.EventService;

@RestController
@RequestMapping("/events")
public class EventController {

    @Autowired
    private EventService eventService;

    /**
     * Gets all events.
     *
     * @return ResponseEntity with the list of all events.
     */
    @GetMapping
    public ResponseEntity<List<Event>> getAllEvents() {
        List<Event> events = eventService.findAll();
        return ResponseEntity.status(HttpStatus.OK).body(events);
    }

    /**
     * Gets an event by ID.
     *
     * @param id The ID of the event to retrieve.
     * @return ResponseEntity with the event details.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Event> getEventById(@PathVariable String id) {
        Optional<Event> event = eventService.findById(id);
        if (event.isEmpty())
            return ResponseEntity.status(404).body(null);
        return ResponseEntity.status(HttpStatus.OK).body(event.get());
    }

    /**
     * Creates a new event.
     *
     * @param event The event details to create.
     * @return ResponseEntity with the created event.
     */
    @PostMapping
    public ResponseEntity<Event> createEvent(@RequestBody EventCreateDTO event) {
        try {
            System.out.println(event);
            Event newEvent = eventService.save(event);
            return ResponseEntity.status(HttpStatus.CREATED).body(newEvent);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    /**
     * Updates an existing event.
     *
     * @param id    The ID of the event to update.
     * @param event The new event details.
     * @return ResponseEntity with the updated event.
     */
    @PutMapping("/{id}")
    public ResponseEntity<Event> updateEvent(@PathVariable String id, @RequestBody EventCreateDTO dto) {
        Optional<Event> optional = eventService.findById(id);
        if (optional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        Event event = eventService.save(dto);
        return ResponseEntity.status(HttpStatus.OK).body(event);
    }

    /**
     * Deletes an event by ID.
     *
     * @param id The ID of the event to delete.
     * @return ResponseEntity indicating success or failure.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteEvent(@PathVariable String id) {
        eventService.deleteById(id);
        return ResponseEntity.status(HttpStatus.OK).body("Event deleted successfully");
    }
}
