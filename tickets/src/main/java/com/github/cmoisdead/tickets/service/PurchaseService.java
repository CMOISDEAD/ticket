package com.github.cmoisdead.tickets.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.cmoisdead.tickets.model.Purchase;
import com.github.cmoisdead.tickets.repository.PurchaseRepository;

@Service
public class PurchaseService {
  @Autowired
  private PurchaseRepository purchaseRepository;

  public List<Purchase> findAll() {
    return purchaseRepository.findAll();
  }

  public Optional<Purchase> findById(String id) {
    return purchaseRepository.findById(id);
  }

  public Purchase save(Purchase purchase) {
    return purchaseRepository.save(purchase);
  }

  public void deleteById(String id) {
    purchaseRepository.deleteById(id);
  }
}
