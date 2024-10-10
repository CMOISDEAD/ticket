package com.github.cmoisdead.tickets.controller;

import com.github.cmoisdead.tickets.dto.cart.CartCreateDTO;
import com.github.cmoisdead.tickets.model.Cart;
import com.github.cmoisdead.tickets.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/cart")
public class CartController {

  @Autowired
  private CartService cartService;

  @GetMapping("/")
  public ResponseEntity<List<Cart>> getCart() {
    return ResponseEntity.status(HttpStatus.OK).body(cartService.findAll());
  }

  @GetMapping("/{id}")
  public ResponseEntity<Cart> getCartById(@PathVariable String id) {
    Optional<Cart> optional = cartService.findById(id);
    if (optional.isEmpty())
      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    return ResponseEntity.status(HttpStatus.OK).body(optional.get());
  }

  @PostMapping
  public ResponseEntity<Cart> createCart(@RequestBody CartCreateDTO dto) {
    Cart savedCart = cartService.save(dto);
    return ResponseEntity.ok(savedCart);
  }

  @PutMapping("/{id}")
  public ResponseEntity<Cart> updateCart(@PathVariable String id, @RequestBody Cart cart) {
    Cart updatedCart = cartService.updateCart(cart);
    return ResponseEntity.ok(updatedCart);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteCart(@PathVariable String id) {
    cartService.deleteById(id);
    return ResponseEntity.ok().build();
  }

  @PostMapping("/clear/{id}")
  public ResponseEntity<Void> clearCart(@PathVariable String id) throws Exception {
    cartService.clearCart(id);
    return ResponseEntity.ok().build();
  }
}
