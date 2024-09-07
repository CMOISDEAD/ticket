package com.github.cmoisdead.tickets.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.cmoisdead.tickets.dto.auth.AuthLoginDTO;
import com.github.cmoisdead.tickets.dto.auth.AuthRegisterDTO;
import com.github.cmoisdead.tickets.model.User;
import com.github.cmoisdead.tickets.repository.UserRepository;

@Service
public class AuthService {
  // TODO: Implement JWT and Bcrypt for passwords

  @Autowired
  private UserRepository userRepository;

  public User Register(AuthRegisterDTO dto) {
    Optional<User> found = userRepository.findByEmailOrUsername(dto.email(), dto.username());

    if (!found.isEmpty())
      throw new Error("Another user with email or username.");

    User user = User.builder()
        .role("USER")
        .firstname(dto.firstname())
        .lastname(dto.lastname())
        .address(dto.address())
        .email(dto.email())
        .password(dto.password())
        .isActive(true)
        .dateOfBirth(dto.dateOfBirth())
        .build();
    userRepository.save(user);

    return user;
  }

  public User Login(AuthLoginDTO dto) throws Exception {
    Optional<User> optional = userRepository.findByEmail(dto.email());

    if (optional.isEmpty())
      throw new Exception("Invalid email or password");

    User user = optional.get();

    if (user.getPassword() != dto.password())
      throw new Exception("Invalid email or password");

    return user;
  }
}
