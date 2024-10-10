package com.github.cmoisdead.tickets.service;

import com.github.cmoisdead.tickets.model.Cart;
import com.github.cmoisdead.tickets.repository.CartRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CartService {

  @Autowired
  CartRepository cartRepository;

  public Optional<Cart> findById(String id) {
    return cartRepository.findById(id);
  }

  public Cart save(Cart cart) {
    return cartRepository.save(cart);
  }

  public void deleteById(String id) {
    cartRepository.deleteById(id);
  }

  public Cart updateCart(Cart cart) {
    return cartRepository.save(cart);
  }

  public void clearCart(String id) throws Exception {
    Optional<Cart> optional = cartRepository.findById(id);
    if (optional.isEmpty())
      throw new Exception("No cart found");
    Cart cart = optional.get();
    cart.setTotalPrice(0);
    cart.setEventIds(null);
    cartRepository.save(cart);
  }
}
