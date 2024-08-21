package com.github.cmoisdead.tickets.model;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
@Document(collection = "users")
public class User {

  @Id
  private String id;

  private Role role;
  private String firstname;
  private String lastname;
  private String address;
  private String email;
  private String password;
  private boolean isActive;
  private LocalDate dateOfBirth;
  private List<String> couponsIds;
  private List<String> purchasesIds;
  private List<String> phoneNumbers;
}

enum Role {
  ADMIN, USER
}
