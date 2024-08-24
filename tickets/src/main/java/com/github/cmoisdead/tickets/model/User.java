package com.github.cmoisdead.tickets.model;

import java.time.LocalDate;
import java.util.Collections;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
@Document(collection = "users")
public class User {

  @Id
  @Builder.Default
  private String id = null;

  private String role;
  private String firstname;
  private String lastname;
  private String address;
  private String email;
  private String password;
  private boolean isActive;
  private LocalDate dateOfBirth;

  @Builder.Default
  private List<String> phoneNumbers = Collections.emptyList();
  @Builder.Default
  private List<String> purchasesIds = Collections.emptyList();;
  @Builder.Default
  private List<String> couponsIds = Collections.emptyList();;
}
