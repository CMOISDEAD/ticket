package com.github.cmoisdead.tickets.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.cmoisdead.tickets.model.Purchase;
import com.github.cmoisdead.tickets.repository.PurchaseRepository;

/**
 * Service class that handles business logic related to Purchase entities.
 * 
 * Provides methods to interact with the PurchaseRepository for common CRUD
 * operations.
 */
@Service
public class PurchaseService {

  @Autowired
  private PurchaseRepository purchaseRepository;

  /**
   * Retrieves all purchase records from the repository.
   * 
   * @return List<Purchase> A list of all purchase records stored in the database.
   * 
   *         Example usage:
   * 
   *         <pre>
   * {@code
   * List<Purchase> purchases = purchaseService.findAll();
   * }
   * </pre>
   */
  public List<Purchase> findAll() {
    return purchaseRepository.findAll();
  }

  /**
   * Retrieves a specific purchase record by its unique identifier.
   * 
   * @param id The unique identifier of the purchase record to retrieve.
   * @return Optional<Purchase> An optional containing the purchase if found, or
   *         empty if not found.
   * 
   *         Example usage:
   * 
   *         <pre>
   * {@code
   * Optional<Purchase> purchase = purchaseService.findById("purchaseId123");
   * }
   * </pre>
   */
  public Optional<Purchase> findById(String id) {
    return purchaseRepository.findById(id);
  }

  /**
   * Saves a new or existing purchase record to the database.
   * 
   * @param purchase The purchase object to be saved.
   * @return Purchase The saved purchase object.
   * 
   *         Example usage:
   * 
   *         <pre>
   * {@code
   * Purchase newPurchase = new Purchase();
   * Purchase savedPurchase = purchaseService.save(newPurchase);
   * }
   * </pre>
   */
  public Purchase save(Purchase purchase) {
    return purchaseRepository.save(purchase);
  }

  /**
   * Deletes a specific purchase record by its unique identifier.
   * 
   * @param id The unique identifier of the purchase to be deleted.
   * 
   *           Example usage:
   * 
   *           <pre>
   * {@code
   * purchaseService.deleteById("purchaseId123");
   * }
   * </pre>
   */
  public void deleteById(String id) {
    purchaseRepository.deleteById(id);
  }
}
