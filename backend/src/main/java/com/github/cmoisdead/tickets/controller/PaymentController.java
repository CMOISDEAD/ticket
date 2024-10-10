package com.github.cmoisdead.tickets.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.github.cmoisdead.tickets.model.Payment;
import com.github.cmoisdead.tickets.resource.MercadopagoResource;
import com.github.cmoisdead.tickets.service.PaymentService;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/payments")
@CrossOrigin(origins = "**")
public class PaymentController {

  @Autowired
  private final PaymentService paymentService;

  @PostMapping
  public MercadopagoResource generatePreference() throws Exception {
    return paymentService.generatePreference();
  }

  @PostMapping("/notifications")
  public ResponseEntity paymentNotifications(
      @RequestParam(required = false) Long id,
      @RequestParam(name = "data.id", required = false) Long dataId,
      @RequestParam(required = false) String type,
      @RequestParam(required = false) String topic,
      @RequestBody Map<String, Object> requestBody) {
    if (id != null && topic != null) {
      // Instant Payment Notification
      System.out.println("=========== RECEIVED IPN ===========");
      System.out.println("Id: " + id);
      System.out.println("Topic: " + topic);
      System.out.println(requestBody);
      System.out.println("====================================");
      paymentService.paymentNotification("IPN_" + id + "_" + topic, requestBody.toString());
    } else if (dataId != null && type != null) {
      // WebHook Notification
      System.out.println("=========== NEW WEB HOOK ===========");
      System.out.println("Data Id: " + dataId);
      System.out.println("Topic: " + type);
      System.out.println(requestBody);
      System.out.println("====================================");
      paymentService.paymentNotification("WH_" + dataId + "_" + type, requestBody.toString());
    } else {
      return ResponseEntity.badRequest().build();
    }
    return ResponseEntity.ok(200);
  }

  @GetMapping
  public Page<Payment> getAllPayments(Pageable pageable) {
    return paymentService.getAllPayments(pageable);
  }

  @DeleteMapping
  public ResponseEntity deletePayments() {
    return paymentService.deleteAllPayments();
  }
}
