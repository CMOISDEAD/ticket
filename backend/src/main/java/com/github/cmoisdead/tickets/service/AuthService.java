package com.github.cmoisdead.tickets.service;

import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.github.cmoisdead.tickets.dto.auth.AuthLoginDTO;
import com.github.cmoisdead.tickets.dto.auth.AuthRegisterDTO;
import com.github.cmoisdead.tickets.dto.utils.TokenDTO;
import com.github.cmoisdead.tickets.model.User;
import com.github.cmoisdead.tickets.repository.UserRepository;
import com.github.cmoisdead.tickets.utils.CryptUtils;
import com.github.cmoisdead.tickets.utils.JwtUtils;

@Service
public class AuthService {
  private JwtUtils jwtUtils;
  private CryptUtils cryptUtils;

  @Autowired
  private UserRepository userRepository;

  public User Register(AuthRegisterDTO dto) {
    Optional<User> found = userRepository.findByEmailOrUsername(dto.email(), dto.username());

    if (!found.isEmpty())
      throw new Error("Another user with email or username.");

    String encryptedPassword = cryptUtils.encryptPassword(dto.password());

    User user = User.builder()
        .role("USER")
        .firstname(dto.firstname())
        .lastname(dto.lastname())
        .address(dto.address())
        .email(dto.email())
        .password(encryptedPassword)
        .isActive(true)
        .dateOfBirth(dto.dateOfBirth())
        .build();
    userRepository.save(user);

    return user;
  }

  public TokenDTO Login(AuthLoginDTO dto) throws Exception {
    Optional<User> optional = userRepository.findByEmail(dto.email());
    BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    if (optional.isEmpty())
      throw new Exception("Invalid email or password");

    User user = optional.get();

    if (!encoder.matches(dto.password(), user.getPassword()))
      throw new Exception("Invalid email or password");

    Map<String, Object> claims = Map.of(
        "id", user.getId(),
        "role", user.getRole(),
        "email", user.getEmail());

    return new TokenDTO(jwtUtils.generateToken(user.getEmail(), claims));
  }
}
