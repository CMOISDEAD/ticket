package com.github.cmoisdead.tickets.service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.cmoisdead.tickets.Enum.PaymentStatus;
import com.github.cmoisdead.tickets.model.Event;
import com.github.cmoisdead.tickets.model.Item;
import com.github.cmoisdead.tickets.model.Payment;
import com.github.cmoisdead.tickets.model.Purchase;
import com.github.cmoisdead.tickets.repository.PaymentRepository;
import com.github.cmoisdead.tickets.repository.PurchaseRepository;
import com.mercadopago.MercadoPagoConfig;
import com.mercadopago.client.payment.PaymentClient;
import com.mercadopago.client.preference.PreferenceBackUrlsRequest;
import com.mercadopago.client.preference.PreferenceClient;
import com.mercadopago.client.preference.PreferenceItemRequest;
import com.mercadopago.client.preference.PreferenceRequest;
import com.mercadopago.exceptions.MPApiException;
import com.mercadopago.exceptions.MPException;
import com.mercadopago.resources.preference.Preference;

@Service
public class PaymentService {

  @Autowired
  PaymentRepository paymentRepository;
  @Autowired
  PurchaseRepository purchaseRepository;
  @Autowired
  EventService eventService;

  public Optional<Payment> getPayment(String id) {
    return paymentRepository.findById(id);
  }

  public Preference realizePay(String purchaseId) throws MPException, MPApiException {
    Optional<Purchase> optional = purchaseRepository.findById(purchaseId);
    if (optional.isEmpty())
      throw new RuntimeException("Purchase not found");

    Purchase purchase = optional.get();
    List<PreferenceItemRequest> items = new ArrayList<>();

    // Run over the order items and create the gateway items
    for (Item item : purchase.getItems()) {

      // Obtener el evento y la localidad del ítem
      Optional<Event> optionalEvent = eventService.findById(item.getId());
      if (optionalEvent.isEmpty())
        throw new RuntimeException("Event not found");
      Event evento = optionalEvent.get();

      // Crear el item de la pasarela
      PreferenceItemRequest itemRequest = PreferenceItemRequest.builder()
          .id(evento.getId())
          .title(evento.getName())
          .categoryId(evento.getType())
          .quantity(item.getUnits())
          .currencyId("COP")
          .unitPrice(BigDecimal.valueOf(item.getPrice()))
          .build();

      items.add(itemRequest);
      System.out.println("Precio unitario de la localidad: " + item.getPrice());
    }

    // Configure the credentials of MercadoPago
    MercadoPagoConfig.setAccessToken("APP_USR-5129434128329573-101017-1b25cbd4d2cf5d91ccdc38be1cdd7ffe-2031339808");

    // Confiture the return urls of the gateway (Frontend)
    PreferenceBackUrlsRequest backUrls = PreferenceBackUrlsRequest.builder()
        .success("URL SUCCESS PAY")
        .failure("URL ERROR PAY")
        .pending("URL PEDDING PAY")
        .build();

    // Contruct the gateway preference with the items, metadata and return urls
    PreferenceRequest preferenceRequest = PreferenceRequest.builder()
        .backUrls(backUrls)
        .items(items)
        .metadata(Map.of("id_orden", purchase.getId()))
        .notificationUrl("http://localhost:8080/payments/notify-pay")
        .build();

    // crete the preference in the MercadoPago gateway
    PreferenceClient client = new PreferenceClient();
    Preference preference = client.create(preferenceRequest);

    // save the code of the gateway in the order
    purchase.setCode(preference.getId());
    purchaseRepository.save(purchase);

    return preference;
  }

  public void receiveNotifications(Map<String, Object> request) {
    try {

      // Obtener el tipo de notificación
      Object tipo = request.get("type");

      // Si la notificación es de un pago entonces obtener el pago y la orden asociada
      if ("payment".equals(tipo)) {

        // Capturamos el JSON que viene en el request y lo convertimos a un String
        String input = request.get("data").toString();

        // Extraemos los números de la cadena, es decir, el id del pago
        String idPago = input.replaceAll("\\D+", "");

        // Se crea el cliente de MercadoPago y se obtiene el pago con el id
        PaymentClient client = new PaymentClient();
        com.mercadopago.resources.payment.Payment payment = client.get(Long.parseLong(idPago));

        // Obtener el id de la orden asociada al pago que viene en los metadatos
        String idOrden = payment.getMetadata().get("id_orden").toString();

        // Se obtiene la orden guardada en la base de datos y se le asigna el pago
        Purchase purchase = getPurchase(idOrden);
        Payment pay = createPay(payment);
        purchase.setPayment(pay);
        purchaseRepository.save(purchase);
      }

    } catch (Exception e) {
      e.printStackTrace();
    }
  }

  public Purchase getPurchase(String id) throws Exception {
    Optional<Purchase> optional = purchaseRepository.findById(id);
    if (optional.isEmpty())
      throw new Exception("Orden no encontrada con ID: " + id);
    return optional.get();
  }

  private Payment createPay(com.mercadopago.resources.payment.Payment payment) {
    Payment pay = new Payment();
    pay.setId(payment.getId().toString());
    pay.setDate(payment.getDateCreated().toLocalDateTime());
    pay.setStatus(PaymentStatus.valueOf(payment.getStatus()));
    pay.setStatusDetail(payment.getStatusDetail());
    pay.setStatus(PaymentStatus.valueOf(payment.getStatus().toLowerCase()));
    pay.setCurrency(payment.getCurrencyId());
    pay.setAuthorizationCode(payment.getAuthorizationCode());
    pay.setTransactionValue(payment.getTransactionAmount().floatValue());
    return pay;
  }

  public List<Payment> getAllPayments() {
    return paymentRepository.findAll();
  }

  public void deletePayment(String id) {
    paymentRepository.deleteById(id);
  }

  public void deleteAllPayments() {
    paymentRepository.deleteAll();
  }
}
