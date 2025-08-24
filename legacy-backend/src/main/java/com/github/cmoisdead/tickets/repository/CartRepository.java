package com.github.cmoisdead.tickets.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.github.cmoisdead.tickets.model.Cart;

public interface CartRepository extends MongoRepository<Cart, String> {
}
