package com.github.cmoisdead.tickets.service;

import com.github.cmoisdead.tickets.dto.cart.CartCreateDTO;
import com.github.cmoisdead.tickets.model.Cart;
import com.github.cmoisdead.tickets.model.User;
import com.github.cmoisdead.tickets.repository.CartRepository;
import com.github.cmoisdead.tickets.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CartService {

  @Autowired
  CartRepository cartRepository;
  @Autowired
  UserRepository userRepository;

  public List<Cart> findAll() {
    return cartRepository.findAll();
  }

  public Optional<Cart> findById(String id) {
    return cartRepository.findById(id);
  }

  public Cart save(CartCreateDTO dto) {
    Cart item = Cart.builder()
        .userId(dto.userId())
        .eventIds(dto.eventIds())
        .totalPrice(0)
        .build();
    Optional<User> optional = userRepository.findById(dto.userId());
    if (optional.isEmpty())
      throw new RuntimeException("User not found");
    Cart cart = cartRepository.save(item);
    User user = optional.get();
    user.setCartId(cart.getId());
    userRepository.save(user);
    return cart;
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
