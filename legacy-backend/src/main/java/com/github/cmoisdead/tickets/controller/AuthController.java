package com.github.cmoisdead.tickets.controller;

import java.util.Optional;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
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
public class AuthController {
    private final JwtUtils jwtUtils = new JwtUtils();

    @Autowired
    AuthService authService;
    @Autowired
    UserService userService;
    @Autowired
    EmailService emailService;


    // logout
    @PostMapping("/logout")
    public ResponseEntity logout(HttpServletResponse response) {
        ResponseCookie cookie = ResponseCookie.from("token", "")
                .httpOnly(true)
                .path("/")
                .maxAge(0)
                .build();
        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.SET_COOKIE, cookie.toString());
        return ResponseEntity.status(HttpStatus.OK).headers(headers).build();
    }

    /**
     * Authenticates a user based on email and password and generates a JWT token.
     *
     * @param request The authentication request containing the user's email and
     *                password.
     * @return ResponseEntity containing a JWT token if authentication is
     * successful.
     * @throws Exception if the email or password is invalid.
     *                   <p>
     *                   Example Request:
     *                   POST /auth/login
     *                   {
     *                   "email": "user@example.com",
     *                   "password": "password123"
     *                   }
     *                   <p>
     *                   Response:
     *                   200 OK
     *                   {
     *                   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6..."
     *                   }
     *                   <p>
     *                   Possible Errors:
     *                   401 Unauthorized - Invalid email or password.
     */
    @PostMapping("/login")
    public ResponseEntity login(@RequestBody AuthLoginDTO request) throws Exception {
        try {
            String token = authService.login(request);
            ResponseCookie cookie = ResponseCookie.from("token", token)
                    .httpOnly(true)
                    .path("/")
                    .build();
            HttpHeaders headers = new HttpHeaders();
            headers.add(HttpHeaders.SET_COOKIE, cookie.toString());
            return ResponseEntity.status(HttpStatus.OK).headers(headers).build();
        } catch (Exception error) {
            if (error.getMessage().equals("Invalid email or password"))
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            throw error;
        }
    }

    /**
     * Registers a new user in the system.
     *
     * @param request The registration request containing user's details (email,
     *                username, password, etc.).
     * @return ResponseEntity containing the created User object if registration is
     * successful.
     * @throws Exception if the registration fails or the email is already in use.
     *                   <p>
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
     *                   <p>
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
     *                   <p>
     *                   Possible Errors:
     *                   400 Bad Request - Email already in use.
     *                   500 Internal Server Error - Registration failed.
     */
    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody AuthRegisterDTO request) throws Exception {
        try {
            User user = authService.register(request);
            return ResponseEntity.status(200).body(user);
        } catch (Exception error) {
            if (error.getMessage().equals("Another user with email or username."))
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
            else return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Generates a password reset link and sends it to the user's email.
     *
     * @param request The request containing the user's email.
     * @return ResponseEntity indicating that the password reset link has been sent.
     * @throws Exception if the user is not found or there is an issue sending the
     *                   email.
     *                   <p>
     *                   Example Request:
     *                   POST /auth/generate
     *                   {
     *                   "email": "user@example.com"
     *                   }
     *                   <p>
     *                   Response:
     *                   200 OK - Password reset link sent.
     *                   <p>
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
                true,
                "password",
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
     *                   <p>
     *                   Example Request:
     *                   POST /auth/recover
     *                   {
     *                   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6...",
     *                   "password": "newPassword123"
     *                   }
     *                   <p>
     *                   Response:
     *                   200 OK
     *                   {
     *                   "id": "123",
     *                   "email": "user@example.com",
     *                   "firstname": "John",
     *                   "lastname": "Doe"
     *                   }
     *                   <p>
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

    // Activate account
}
