package com.github.cmoisdead.tickets.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.github.cmoisdead.tickets.dto.coupon.CouponCreateDTO;
import com.github.cmoisdead.tickets.model.Coupon;
import com.github.cmoisdead.tickets.service.CouponService;

@RestController
@RequestMapping("/coupons")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class CouponController {
  @Autowired
  private CouponService couponService;

  /**
   * Gets all coupons.
   *
   * @return ResponseEntity with the list of all coupons.
   */
  @GetMapping
  public ResponseEntity<List<Coupon>> getAllCoupons() {
    List<Coupon> coupons = couponService.findAll();
    return ResponseEntity.status(200).body(coupons);
  }

  /**
   * Gets a coupon by ID.
   *
   * @param id The ID of the coupon to retrieve.
   * @return ResponseEntity with the coupon details.
   */
  @GetMapping("/{id}")
  public ResponseEntity<Coupon> getCouponById(@PathVariable String id) {
    Optional<Coupon> coupon = couponService.findById(id);
    if (coupon.isEmpty())
      return ResponseEntity.status(404).body(null);
    return ResponseEntity.status(200).body(coupon.get());
  }

  @PostMapping("/")
  public ResponseEntity<Coupon> createCoupon(@RequestBody CouponCreateDTO dto) {
    Coupon coupon = couponService.save(dto);
    return ResponseEntity.status(200).body(coupon);
  }

  @PutMapping("/{id}")
  public ResponseEntity<Coupon> updateCoupon(@PathVariable String id, @RequestBody CouponCreateDTO dto) {
    Optional<Coupon> coupon = couponService.findById(id);
    if (coupon.isEmpty())
      return ResponseEntity.status(404).body(null);
    Coupon updatedCoupon = couponService.save(dto);
    return ResponseEntity.status(200).body(updatedCoupon);
  }

  /**
   * Redeems a global coupon.
   *
   * @param couponCode The code of the global coupon.
   * @param userId     The ID of the user redeeming the coupon.
   * @return ResponseEntity indicating success or failure.
   */
  @PostMapping("/redeem/global")
  public ResponseEntity<String> redeemGlobalCoupon(@RequestParam String couponCode, @RequestParam String userId) {
    return ResponseEntity.status(501).body("Not implemented");
  }

  /**
   * Redeems a personal coupon.
   *
   * @param couponCode The code of the personal coupon.
   * @param userId     The ID of the user redeeming the coupon.
   * @return ResponseEntity indicating success or failure.
   */
  @PostMapping("/redeem/personal")
  public ResponseEntity<String> redeemPersonalCoupon(@RequestParam String couponCode, @RequestParam String userId) {
    return ResponseEntity.status(501).body("Not implemented");
  }

  /**
   * Deletes a coupon by ID.
   *
   * @param id The ID of the coupon to delete.
   * @return ResponseEntity indicating success or failure.
   */
  @DeleteMapping("/{id}")
  public ResponseEntity<String> deleteCoupon(@PathVariable String id) {
    couponService.deleteById(id);
    return ResponseEntity.status(200).body("Coupon deleted");
  }
}
