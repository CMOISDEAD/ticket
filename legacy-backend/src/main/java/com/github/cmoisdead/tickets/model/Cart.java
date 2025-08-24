package com.github.cmoisdead.tickets.model;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class Cart {
    private List<String> eventsIds;
    private List<String> couponsIds;
    private double totalPrice;
    private double discount;

    public Cart() {
        this.couponsIds = new ArrayList<>();
        this.eventsIds = new ArrayList<>();
        this.totalPrice = 0;
        this.discount = 0;
    }

    public void addCoupon(String couponId, Coupon coupon) throws Exception {
        if (coupon.isExpired()) throw new Exception("Coupon expired");
        if (couponsIds.contains(couponId)) throw new Exception("Coupon already added");

        couponsIds.add(couponId);
        discount += coupon.getDiscount();
    }

    public void removeCoupon(String couponId, Coupon coupon) {
        couponsIds.remove(couponId);
        discount -= coupon.getDiscount();
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
}