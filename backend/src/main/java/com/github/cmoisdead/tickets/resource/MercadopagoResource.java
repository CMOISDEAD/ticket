package com.github.cmoisdead.tickets.resource;

import com.mercadopago.resources.datastructures.preference.Item;
import lombok.Data;

import java.util.List;

@Data
public class MercadopagoResource {
  private String id;
  private String initPoint;
  private String sandboxInitPoint;
  private String externalReference;
  private List<Item> items;
}
