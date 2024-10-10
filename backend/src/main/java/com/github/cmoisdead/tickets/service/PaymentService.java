package com.github.cmoisdead.tickets.service;

import com.github.cmoisdead.tickets.model.Payment;
import com.github.cmoisdead.tickets.repository.PaymentRepository;
import com.github.cmoisdead.tickets.resource.MercadopagoResource;
import com.mercadopago.MercadoPago;
import com.mercadopago.resources.Preference;
import com.mercadopago.resources.datastructures.preference.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class PaymentService {

  @Autowired
  PaymentRepository paymentRepository;

  public MercadopagoResource generatePreference() throws Exception {
    try {
      MercadoPago.SDK.setAccessToken("");
      MercadoPago.SDK.setIntegratorId("");
      Preference preference = new Preference();

      Item item = new Item();
      item.setId("1234");
      item.setTitle("Apple iPhone 5S");
      item.setPictureUrl("https://i.blogs.es/3ade97/iphone-5-4/1366_2000.jpg");
      item.setQuantity(1);
      item.setDescription("Dispositivo móvil de Tienda e-commerce");
      item.setCurrencyId("PEN");
      item.setUnitPrice((float) 149.99);
      preference.appendItem(item);

      Payer payer = new Payer();
      payer.setName("Lalo Landa")
          .setEmail("test_user_46542185@testuser.com")
          .setIdentification(new Identification()
              .setType("DNI")
              .setNumber("223344445"))
          .setPhone(new Phone()
              .setAreaCode("52")
              .setNumber("5549737300"))
          .setAddress(new Address()
              .setZipCode("03940")
              .setStreetNumber(1602)
              .setStreetName("Insurgentes Sur"));
      preference.setPayer(payer);

      preference.setBackUrls(
          new BackUrls()
              .setFailure("")
              .setPending("")
              .setSuccess(""));
      preference.setNotificationUrl("");
      preference.setExternalReference("manriqueacham@gmail.com");

      PaymentMethods paymentMethods = new PaymentMethods();
      paymentMethods.setExcludedPaymentMethods("diners");
      paymentMethods.setExcludedPaymentTypes("atm");
      paymentMethods.setInstallments(6);
      preference.setPaymentMethods(paymentMethods);
      preference.setAutoReturn(Preference.AutoReturn.approved);

      // Saving and returning
      preference = preference.save();

      // Resource (DTO)
      MercadopagoResource resource = new MercadopagoResource();
      resource.setId(preference.getId());
      resource.setInitPoint(preference.getInitPoint());
      resource.setSandboxInitPoint(preference.getSandboxInitPoint());
      resource.setItems(preference.getItems());
      resource.setExternalReference(preference.getExternalReference());
      return resource;

    } catch (Exception exception) {
      throw new Exception("Something went wrong", exception);
    }
  }

  public void paymentNotification(String parameters, String body) {
    Payment payment = new Payment();
    payment.setParameters(parameters);
    payment.setBody(body);
    paymentRepository.save(payment);
  }

  public Page<Payment> getAllPayments(Pageable pageable) {
    return paymentRepository.findAll(pageable);
  }

  public ResponseEntity deleteAllPayments() {
    paymentRepository.deleteAll();
    return ResponseEntity.ok().build();
  }
}
