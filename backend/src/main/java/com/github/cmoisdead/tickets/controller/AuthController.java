package com.github.cmoisdead.tickets.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.github.cmoisdead.tickets.dto.auth.AuthLoginDTO;
import com.github.cmoisdead.tickets.dto.auth.AuthRecoverDTO;
import com.github.cmoisdead.tickets.dto.auth.AuthRegisterDTO;
import com.github.cmoisdead.tickets.dto.user.UserGeneratePasswordDTO;
import com.github.cmoisdead.tickets.dto.utils.EmailDTO;
import com.github.cmoisdead.tickets.dto.utils.TokenDTO;
import com.github.cmoisdead.tickets.model.User;
import com.github.cmoisdead.tickets.service.AuthService;
import com.github.cmoisdead.tickets.service.EmailService;
import com.github.cmoisdead.tickets.service.UserService;
import com.github.cmoisdead.tickets.utils.JwtUtils;
import com.mercadopago.net.HttpStatus;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class AuthController {
  private final JwtUtils jwtUtils = new JwtUtils();

  @Autowired
  AuthService authService;
  @Autowired
  UserService userService;
  @Autowired
  EmailService emailService;

  /**
   * Authenticates a user based on email and password and generates a JWT token.
   *
   * @param request The authentication request containing the user's email and
   *                password.
   * @return ResponseEntity containing a JWT token if authentication is
   *         successful.
   * @throws Exception if the email or password is invalid.
   *
   *                   Example Request:
   *                   POST /auth/login
   *                   {
   *                   "email": "user@example.com",
   *                   "password": "password123"
   *                   }
   *
   *                   Response:
   *                   200 OK
   *                   {
   *                   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6..."
   *                   }
   *
   *                   Possible Errors:
   *                   401 Unauthorized - Invalid email or password.
   */
  @PostMapping("/login")
  public ResponseEntity<String> login(@RequestBody AuthLoginDTO request) throws Exception {
    TokenDTO token = authService.login(request);
    return ResponseEntity.status(HttpStatus.OK).body(token.toString());
  }

  /**
   * Registers a new user in the system.
   *
   * @param request The registration request containing user's details (email,
   *                username, password, etc.).
   * @return ResponseEntity containing the created User object if registration is
   *         successful.
   * @throws Exception if the registration fails or the email is already in use.
   *
   *                   Example Request:
   *                   POST /auth/register
   *                   {
   *                   "email": "user@example.com",
   *                   "username": "newuser",
   *                   "password": "password123",
   *                   "firstname": "John",
   *                   "lastname": "Doe",
   *                   "address": "123 Main St",
   *                   "dateOfBirth": "2000-01-01"
   *                   }
   *
   *                   Response:
   *                   200 OK
   *                   {
   *                   "id": "123",
   *                   "email": "user@example.com",
   *                   "username": "newuser",
   *                   "firstname": "John",
   *                   "lastname": "Doe"
   *                   ...
   *                   }
   *
   *                   Possible Errors:
   *                   400 Bad Request - Email already in use.
   *                   500 Internal Server Error - Registration failed.
   */
  @PostMapping("/register")
  public ResponseEntity<User> register(@RequestBody AuthRegisterDTO request) throws Exception {
    Optional<User> optional = userService.findByEmail(request.email());
    if (optional.isPresent())
      return ResponseEntity.status(400).build();
    User user = authService.Register(request);
    return ResponseEntity.status(200).body(user);
  }

  /**
   * Generates a password reset link and sends it to the user's email.
   *
   * @param request The request containing the user's email.
   * @return ResponseEntity indicating that the password reset link has been sent.
   * @throws Exception if the user is not found or there is an issue sending the
   *                   email.
   *
   *                   Example Request:
   *                   POST /auth/generate
   *                   {
   *                   "email": "user@example.com"
   *                   }
   *
   *                   Response:
   *                   200 OK - Password reset link sent.
   *
   *                   Possible Errors:
   *                   404 Not Found - User not found.
   */
  @PostMapping("/generate")
  public ResponseEntity<String> generate(@RequestBody UserGeneratePasswordDTO request) throws Exception {
    Optional<User> user = userService.findByEmail(request.email());
    if (user.isEmpty()) {
      return ResponseEntity.status(404).body("User not found");
    }
    String link = userService.sendPasswordResetEmail(request.email());
    EmailDTO message = new EmailDTO(
        "Password Reset",
        request.email(),
        "QueBoleta.com",
        link);
    emailService.sendEmail(message);
    return ResponseEntity.ok("Password reset link sent");
  }

  /**
   * Resets the user's password using a token.
   *
   * @param token    The token received via email to authenticate the password
   *                 reset.
   * @param password The new password the user wishes to set.
   * @return The updated User object after the password reset.
   * @throws Exception if the token is invalid or there is an issue with the
   *                   password reset process.
   *
   *                   Example Request:
   *                   POST /auth/recover
   *                   {
   *                   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6...",
   *                   "password": "newPassword123"
   *                   }
   *
   *                   Response:
   *                   200 OK
   *                   {
   *                   "id": "123",
   *                   "email": "user@example.com",
   *                   "firstname": "John",
   *                   "lastname": "Doe"
   *                   }
   *
   *                   Possible Errors:
   *                   400 Bad Request - Invalid or expired token.
   *                   500 Internal Server Error - Failed to reset password.
   */
  @PostMapping("/recover")
  public User recover(@RequestBody AuthRecoverDTO dto) throws Exception {
    Jws<Claims> jwt = jwtUtils.parseToken(dto.token());
    Claims payload = jwt.getPayload();
    return userService.updatePassword(payload.get("id").toString(), dto.password());
  }
}
