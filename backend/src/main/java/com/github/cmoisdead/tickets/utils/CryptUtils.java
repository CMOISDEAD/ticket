package com.github.cmoisdead.tickets.utils;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class CryptUtils {
  BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

  public String encryptPassword(String password) {
    return this.passwordEncoder.encode(password);
  }

  public boolean checkPassword(String password, String hashedPassword) {
    return this.passwordEncoder.matches(password, hashedPassword);
  }
}
