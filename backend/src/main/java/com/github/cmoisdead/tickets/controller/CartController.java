package com.github.cmoisdead.tickets.controller;

import com.github.cmoisdead.tickets.dto.cart.CartAddItemDTO;
import com.github.cmoisdead.tickets.model.Cart;
import com.github.cmoisdead.tickets.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @GetMapping("/{id}")
    public ResponseEntity<Cart> get(@PathVariable String id) {
        try {
            Cart cart = cartService.findById(id);
            return ResponseEntity.status(HttpStatus.OK).body(cart);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PutMapping("/add")
    public ResponseEntity<Cart> add(@RequestBody CartAddItemDTO dto) throws Exception {
        try {
            cartService.addItem(dto.userId(), dto.eventId());
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            if (e.getMessage().equals("User not found")) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
            throw new Exception(e.getMessage());
            // return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @PutMapping("/removeitem")
    public ResponseEntity<Void> delete(@RequestBody CartAddItemDTO dto) {
        try {
            cartService.removeItem(dto.userId(), dto.eventId());
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PostMapping("/clear/{id}")
    public ResponseEntity<Void> clear(@PathVariable String id) throws Exception {
        try {
            cartService.clearCart(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
