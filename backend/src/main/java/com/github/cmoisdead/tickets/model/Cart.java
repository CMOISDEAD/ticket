package com.github.cmoisdead.tickets.model;


import com.github.cmoisdead.tickets.service.CartService;
import com.github.cmoisdead.tickets.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class Cart {
    private List<String> eventsIds;
    private double totalPrice;
    private double discount;

    public Cart() {
        this.eventsIds = new ArrayList<>();
        this.totalPrice = 0;
        this.discount = 0;
    }

    public void addItem(String eventId, Event event) {
        eventsIds.add(eventId);
        totalPrice += event.getPrice();
    }

    public void removeItem(String eventId, Event event) {
        eventsIds.remove(eventId);
        totalPrice -= event.getPrice();
    }

    public void clearCart() {
        eventsIds.clear();
        totalPrice = 0;
        discount = 0;
    }

    public List<String> getEventsIds() {
        return eventsIds;
    }

    public void setEventsIds(List<String> eventsIds) {
        this.eventsIds = eventsIds;
    }

    public double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(double totalPrice) {
        this.totalPrice = totalPrice;
    }
}