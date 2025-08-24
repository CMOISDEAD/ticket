package com.github.cmoisdead.tickets.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.github.cmoisdead.tickets.model.Purchase;

public interface PurchaseRepository extends MongoRepository<Purchase, String> {
}
