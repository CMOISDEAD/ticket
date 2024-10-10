package com.github.cmoisdead.tickets.controller;

import com.github.cmoisdead.tickets.model.Purchase;
import com.github.cmoisdead.tickets.service.PurchaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/purchases")
public class PurchaseController {

  @Autowired
  private PurchaseService purchaseService;

  /**
   * Gets all purchases.
   *
   * @return ResponseEntity with the list of all purchases.
   */
  @GetMapping
  public ResponseEntity<List<Purchase>> getAllPurchases() {
    List<Purchase> purchases = purchaseService.findAll();
    return ResponseEntity.status(HttpStatus.OK).body(purchases);
  }

  /**
   * Gets a purchase by ID.
   *
   * @param id The ID of the purchase to retrieve.
   * @return ResponseEntity with the purchase details.
   */
  @GetMapping("/{id}")
  public ResponseEntity<Purchase> getPurchaseById(@PathVariable String id) {
    Optional<Purchase> optional = purchaseService.findById(id);
    if (optional.isEmpty())
      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    return ResponseEntity.status(HttpStatus.OK).body(optional.get());
  }

  /**
   * Creates a new purchase.
   *
   * @param purchase The purchase details to create.
   * @return ResponseEntity with the created purchase.
   */
  @PostMapping
  public ResponseEntity<Purchase> createPurchase(@RequestBody Purchase purchase) {
    Purchase createdPurchase = purchaseService.save(purchase);
    return ResponseEntity.status(HttpStatus.CREATED).body(createdPurchase);
  }

  /**
   * Updates an existing purchase.
   *
   * @param id       The ID of the purchase to update.
   * @param purchase The new purchase details.
   * @return ResponseEntity with the updated purchase.
   */
  @PutMapping("/{id}")
  public ResponseEntity<Purchase> updatePurchase(@PathVariable String id, @RequestBody Purchase purchase) {
    Optional<Purchase> existingPurchase = purchaseService.findById(id);
    if (existingPurchase.isEmpty())
      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    purchase.setId(id);
    Purchase updatedPurchase = purchaseService.save(purchase);
    return ResponseEntity.status(HttpStatus.OK).body(updatedPurchase);
  }

  /**
   * Deletes a purchase by ID.
   *
   * @param id The ID of the purchase to delete.
   * @return ResponseEntity indicating success or failure.
   */
  @DeleteMapping("/{id}")
  public ResponseEntity<String> deletePurchase(@PathVariable String id) {
    purchaseService.deleteById(id);
    return ResponseEntity.status(HttpStatus.OK).body("Purchase deleted successfully");
  }
}
