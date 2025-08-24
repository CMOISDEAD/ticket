package com.github.cmoisdead.tickets.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.github.cmoisdead.tickets.model.Payment;

public interface PaymentRepository extends MongoRepository<Payment, String> {
}
