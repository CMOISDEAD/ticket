package com.github.cmoisdead.tickets.controller;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.github.cmoisdead.tickets.dto.MessageDTO;
import com.github.cmoisdead.tickets.dto.payment.PaymentPayDTO;
import com.github.cmoisdead.tickets.model.Payment;
import com.github.cmoisdead.tickets.service.PaymentService;
import com.mercadopago.net.HttpStatus;
import com.mercadopago.resources.preference.Preference;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/payments")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class PaymentController {

  @Autowired
  private final PaymentService paymentService;

  @GetMapping("/")
  public ResponseEntity<List<Payment>> getAllPayments() {
    return ResponseEntity.status(HttpStatus.OK).body(paymentService.getAllPayments());
  }

  @GetMapping("/{id}")
  public ResponseEntity<Payment> getPayment(@RequestParam String id) throws Exception {
    Optional<Payment> optional = paymentService.getPayment(id);
    if (optional.isEmpty())
      throw new Exception("payment dont exist");
    Payment payment = optional.get();
    return ResponseEntity.status(HttpStatus.OK).body(payment);
  }

  @PostMapping("/realize-pay")
  public ResponseEntity<MessageDTO<Preference>> realizarPagoProfe(@RequestBody PaymentPayDTO dto)
      throws Exception {
    return ResponseEntity.ok().body(new MessageDTO<>(false, paymentService.realizePay(dto.id())));
  }

  @PostMapping("/notify-pay")
  public void recibirNotificacionMercadoPago(@RequestBody Map<String, Object> request) {
    paymentService.receiveNotifications(request);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<String> deletePayments(@RequestParam String id) {
    paymentService.deletePayment(id);
    return ResponseEntity.status(HttpStatus.OK).body("Removed payment");
  }
}
