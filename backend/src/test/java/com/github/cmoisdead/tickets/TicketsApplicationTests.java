package com.github.cmoisdead.tickets;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.github.cmoisdead.tickets.service.UserService;

@SpringBootTest
class TicketsApplicationTests {

	@Autowired
	UserService userService = new UserService();

	@Test
	void contextLoads() {
	}

	@Test
	public void AddClient() {
	}
}
