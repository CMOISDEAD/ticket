package com.github.cmoisdead.tickets.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.cmoisdead.tickets.model.Coupon;

@Service
public class CouponService {
  @Autowired
  private CouponService couponService;

  public List<Coupon> findAll() {
    return couponService.findAll();
  }

  public Optional<Coupon> findById(String id) {
    return couponService.findById(id);
  }

  public Coupon save(Coupon coupon) {
    return couponService.save(coupon);
  }

  public void deleteById(String id) {
    couponService.deleteById(id);
  }
}
