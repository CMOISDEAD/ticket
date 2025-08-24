package com.github.cmoisdead.tickets.service;

import java.util.Collections;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.github.cmoisdead.tickets.dto.auth.AuthLoginDTO;
import com.github.cmoisdead.tickets.dto.auth.AuthRegisterDTO;
import com.github.cmoisdead.tickets.dto.coupon.CouponCreateDTO;
import com.github.cmoisdead.tickets.dto.utils.EmailDTO;
import com.github.cmoisdead.tickets.dto.utils.TokenDTO;
import com.github.cmoisdead.tickets.model.User;
import com.github.cmoisdead.tickets.repository.UserRepository;
import com.github.cmoisdead.tickets.utils.JwtUtils;

@Service
public class AuthService {
    private final JwtUtils jwtUtils = new JwtUtils();
    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserService userService;
    @Autowired
    private CouponService couponService;
    @Autowired
    private EmailService emailService;

    /**
     * Registers a new user in the system.
     * <p>
     * This method creates a new user with the provided registration data, ensuring
     * that no other user exists with the same email or username. The password is
     * encrypted before being saved in the database. Upon successful registration,
     * the new user is saved and returned.
     *
     * @param dto An AuthRegisterDTO containing user registration details such as
     *            email, username, password, and personal information.
     * @return User The newly registered user.
     * @throws Exception
     * @throws Error     If a user with the same email or username already exists,
     *                   an error is thrown with the message "Another user with
     *                   email or
     *                   username".
     *                   <p>
     *                   Example usage:
     *
     *                   <pre>
     *                                                                     {@code
     *                                                       AuthRegisterDTO registerData = new AuthRegisterDTO(
     *                                                           "user@example.com", "username123", "password123", "John", "Doe",
     *                                                           "123 Street Name", "1990-01-01"
     *                                                       );
     *                                                       User newUser = authService.Register(registerData);
     *                                                       </pre>
     *                   }
     */
    public User register(AuthRegisterDTO dto) throws Exception {
        Optional<User> found = userRepository.findByEmailOrUsername(dto.email(), dto.username());

        if (!found.isEmpty())
            throw new Exception("Another user with email or username.");

        String encryptedPassword = encoder.encode(dto.password());

        User newUser = User.builder()
                .role("USER")
                .username(dto.username())
                .firstname(dto.firstname())
                .lastname(dto.lastname())
                .address(dto.address())
                .email(dto.email())
                .password(encryptedPassword)
                .isActive(true)
                .coupons(Collections.emptyList())
                .dateOfBirth(dto.dateOfBirth())
                .build();

        User user = userRepository.save(newUser);

        CouponCreateDTO coupon = CouponCreateDTO.builder()
                .code("NEW_USER")
                .name("New User Coupon")
                .userId(user.getId())
                .discount(10.0)
                .expiryDate(null)
                .build();

        couponService.save(coupon);

        Map<String, Object> claims = Map.of("id", user.getId());

        String token = jwtUtils.generateToken(user.getEmail(), claims);


        EmailDTO message = new EmailDTO(
                true,
                "register",
                "Felicidades por crear una cuenta",
                user.getEmail(),
                "QueBoleta.com",
                token);
        emailService.sendEmail(message);

        return user;
    }

    /**
     * Handles user login and returns a JWT token if authentication is successful.
     * <p>
     * This method validates the user credentials (email and password) by checking
     * them against the stored values in the database. If valid, it generates and
     * returns a JWT token containing user details such as ID, role, and email.
     *
     * @param dto An AuthLoginDTO object containing the user's email and password.
     * @return TokenDTO A Data Transfer Object that contains the generated JWT
     * token.
     * @throws Exception If the email does not exist or if the password is invalid,
     *                   an exception is thrown with the message "Invalid email or
     *                   password".
     *                   <p>
     *                   Example usage:
     *
     *                   <pre>
     *                                                       {@code
     *                                                        AuthLoginDTO loginData = new AuthLoginDTO("user@example.com", "password123");
     *                                                        TokenDTO token = authService.login(loginData);
     *                                                       }
     *                                                       </pre>
     */
    public String login(AuthLoginDTO dto) throws Exception {
        Optional<User> optional = userRepository.findByEmail(dto.email());

        if (optional.isEmpty())
            throw new Exception("Invalid email or password");

        User user = optional.get();

        if (!user.isActive()) {
            userService.activateUser(user.getId());
        }

        if (!encoder.matches(dto.password(), user.getPassword()))
            throw new Exception("Invalid email or password");

        Map<String, Object> claims = Map.of(
                "id", user.getId(),
                "username", user.getUsername(),
                "role", user.getRole(),
                "email", user.getEmail());

        TokenDTO token = new TokenDTO(jwtUtils.generateToken(user.getEmail(), claims));

        EmailDTO message = new EmailDTO(
                true,
                "login",
                "Nuevo inicio de sesion registrado.",
                user.getEmail(),
                "QueBoleta.com",
                "Hemos registrado un nuevo inicio de sesion.");
        emailService.sendEmail(message);

        return token.token();
    }
}
