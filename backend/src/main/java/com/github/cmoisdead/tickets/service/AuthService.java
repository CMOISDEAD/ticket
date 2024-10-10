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

  /**
   * Registers a new user in the system.
   * 
   * This method creates a new user with the provided registration data, ensuring
   * that no other user exists with the same email or username. The password is
   * encrypted before being saved in the database. Upon successful registration,
   * the new user is saved and returned.
   * 
   * @param dto An AuthRegisterDTO containing user registration details such as
   *            email, username, password, and personal information.
   * @return User The newly registered user.
   * @throws Error If a user with the same email or username already exists,
   *               an error is thrown with the message "Another user with email or
   *               username".
   * 
   *               Example usage:
   * 
   *               <pre>
   *               {@code
   * AuthRegisterDTO registerData = new AuthRegisterDTO(
   *     "user@example.com", "username123", "password123", "John", "Doe", 
   *     "123 Street Name", "1990-01-01"
   * );
   * User newUser = authService.Register(registerData);
   * </pre>
   * }
   */
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

  /**
   * Handles user login and returns a JWT token if authentication is successful.
   * 
   * This method validates the user credentials (email and password) by checking
   * them against the stored values in the database. If valid, it generates and
   * returns a JWT token containing user details such as ID, role, and email.
   * 
   * @param dto An AuthLoginDTO object containing the user's email and password.
   * @return TokenDTO A Data Transfer Object that contains the generated JWT
   *         token.
   * @throws Exception If the email does not exist or if the password is invalid,
   *                   an exception is thrown with the message "Invalid email or
   *                   password".
   * 
   *                   Example usage:
   * 
   *                   <pre>
   * {@code
   *  AuthLoginDTO loginData = new AuthLoginDTO("user@example.com", "password123");
   *  TokenDTO token = authService.login(loginData);
   * }
   * </pre>
   */
  public TokenDTO login(AuthLoginDTO dto) throws Exception {
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
