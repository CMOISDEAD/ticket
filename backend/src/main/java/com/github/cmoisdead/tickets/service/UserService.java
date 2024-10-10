package com.github.cmoisdead.tickets.service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.cmoisdead.tickets.dto.user.UserCreateDTO;
import com.github.cmoisdead.tickets.dto.utils.TokenDTO;
import com.github.cmoisdead.tickets.model.User;
import com.github.cmoisdead.tickets.repository.UserRepository;
import com.github.cmoisdead.tickets.utils.JwtUtils;

@Service
public class UserService {
  private JwtUtils jwtUtils;

  @Autowired
  private UserRepository userRepository;

  /**
   * Retrieves all users from the database.
   * 
   * @return List<User> A list of all users.
   */
  public List<User> findAll() {
    return userRepository.findAll();
  }

  /**
   * Finds a user by their unique ID.
   * 
   * @param id The unique identifier of the user.
   * @return Optional<User> An optional containing the user if found, or empty if
   *         not.
   */
  public Optional<User> findById(String id) {
    return userRepository.findById(id);
  }

  /**
   * Finds a user by their email address.
   * 
   * @param email The email of the user to be found.
   * @return Optional<User> An optional containing the user if found, or empty if
   *         not.
   */
  public Optional<User> findByEmail(String email) {
    return userRepository.findByEmail(email);
  }

  /**
   * Saves a new user to the database.
   * 
   * This method builds a new user from the provided UserCreateDTO and saves it to
   * the repository.
   * 
   * @param userdto A Data Transfer Object containing the user's details such as
   *                firstname, lastname, address, email, password, and date of
   *                birth.
   * @return User The newly created and saved user.
   * 
   *         Example usage:
   * 
   *         <pre>
   * {@code
   * UserCreateDTO userdto = new UserCreateDTO("John", "Doe", "123 Street", "user@example.com", "password", "1990-01-01");
   * User user = userService.save(userdto);
   * }
   * </pre>
   */
  public User save(UserCreateDTO userdto) {
    User user = User.builder()
        .role("USER")
        .firstname(userdto.firstname())
        .lastname(userdto.lastname())
        .address(userdto.address())
        .email(userdto.email())
        .password(userdto.password())
        .isActive(true)
        .dateOfBirth(userdto.dateOfBirth())
        .build();
    return userRepository.save(user);
  }

  /**
   * Deletes a user by their unique ID.
   * 
   * @param id The unique identifier of the user to be deleted.
   */
  public void deleteById(String id) {
    userRepository.deleteById(id);
  }

  /**
   * Deletes all users from the database.
   */
  public void deleteAll() {
    userRepository.deleteAll();
  }

  /**
   * Updates an existing user in the database.
   * 
   * @param user The updated user object to be saved.
   * @return User The updated user after being saved to the database.
   */
  public User update(User user) {
    return userRepository.save(user);
  }

  /**
   * Updates the password of a user.
   *
   * @param id       the ID of the user whose password will be updated
   * @param password the new password to be set for the user
   * @return the updated User object
   * @throws Error if the user is not found by the provided ID
   *
   *               This method retrieves a user by their ID from the database. If
   *               the user is found,
   *               it updates their password and saves the changes. If the user is
   *               not found, it throws an error.
   */
  public User updatePassword(String id, String password) {
    Optional<User> optional = userRepository.findById(id);
    if (optional.isEmpty()) {
      throw new Error("User not found");
    }
    User user = optional.get();
    user.setPassword(password);
    return userRepository.save(user);
  }

  /**
   * Generates and sends a password reset link to the user's email.
   *
   * @param email the email of the user who requested a password reset
   * @return a password reset link containing a JWT token for the reset process
   *
   *         This method creates a JWT token containing the user's email and an
   *         action identifier ("reset-password").
   *         It then constructs a password reset link using the generated token
   *         and returns it. This link is
   *         typically sent to the user's email to allow them to reset their
   *         password.
   */
  public String sendPasswordResetEmail(String email) {
    Map<String, Object> claims = Map.of(
        "email", email,
        "action", "reset-password");
    TokenDTO resetToken = new TokenDTO(jwtUtils.generateToken(email, claims));
    String resetLink = "http://localhost:8080/auth/reset-password/" + resetToken; // TODO: this probably change...
    return resetLink;
  }
}
