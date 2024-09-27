package com.github.cmoisdead.tickets.utils;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class CryptUtils {
  public String encryptPassword(String password) {
    BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    return passwordEncoder.encode(password);
  }
}
