package com.github.cmoisdead.tickets.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.cmoisdead.tickets.dto.UserCreateDTO;
import com.github.cmoisdead.tickets.model.User;
import com.github.cmoisdead.tickets.repository.UserRepository;

@Service
public class UserService {

  @Autowired
  private UserRepository userRepository;

  public List<User> findAll() {
    return userRepository.findAll();
  }

  public User findById(String id) {
    return userRepository.findById(id).orElse(null);
  }

  public User findByEmail(String email) {
    return userRepository.findByEmail(email).orElse(null);
  }

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

  public void deleteById(String id) {
    userRepository.deleteById(id);
  }

  public void deleteAll() {
    userRepository.deleteAll();
  }

  public User update(User user) {
    return userRepository.save(user);
  }
}
