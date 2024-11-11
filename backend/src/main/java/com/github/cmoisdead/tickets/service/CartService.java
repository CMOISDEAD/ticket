package com.github.cmoisdead.tickets.service;

import com.github.cmoisdead.tickets.model.Cart;
import com.github.cmoisdead.tickets.model.Event;
import com.github.cmoisdead.tickets.model.User;
import com.github.cmoisdead.tickets.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CartService {

    @Autowired
    UserRepository userRepository;
    @Autowired
    EventService eventService;

    public Cart findById(String id) throws Exception {
        Optional<User> optional = userRepository.findById(id);
        if (optional.isEmpty()) throw new Exception("User not found");
        User user = optional.get();
        return user.getCart();
    }

    public void addItem(String userId, String eventId) throws Exception {
        Optional<User> optional = userRepository.findById(userId);
        if (optional.isEmpty()) throw new Exception("User not found");
        User user = optional.get();
        Cart cart = user.getCart();
        Optional<Event> event = eventService.findById(eventId);
        if (event.isEmpty()) throw new Exception("Event not found");
        cart.addItem(eventId, event.get());
        userRepository.save(user);
    }

    public void removeItem(String id, String eventId) throws Exception {
        Optional<User> optional = userRepository.findById(id);
        if (optional.isEmpty()) throw new Exception("User not found");
        User user = optional.get();
        Cart cart = user.getCart();
        Optional<Event> event = eventService.findById(eventId);
        if (event.isEmpty()) throw new Exception("Event not found");
        cart.removeItem(eventId, event.get());
        userRepository.save(user);
    }


    public void clearCart(String id) throws Exception {
        Optional<User> optional = userRepository.findById(id);
        if (optional.isEmpty()) throw new Exception("User not found");
        User user = optional.get();
        Cart cart = user.getCart();
        cart.clearCart();
        userRepository.save(user);
    }
}
