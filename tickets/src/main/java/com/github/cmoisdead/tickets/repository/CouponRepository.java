package com.github.cmoisdead.tickets.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.github.cmoisdead.tickets.model.Coupon;

public interface CouponRepository extends MongoRepository<Coupon, String> {
  Optional<Coupon> findByCode(String code);
}
