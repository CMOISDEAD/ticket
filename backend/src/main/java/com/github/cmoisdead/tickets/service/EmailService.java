package com.github.cmoisdead.tickets.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.github.cmoisdead.tickets.dto.utils.EmailDTO;

import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {
  @Autowired
  private JavaMailSender mailSender;
  private String template = "";

  public void sendEmail(EmailDTO data) throws Exception {
    MimeMessage message = mailSender.createMimeMessage();
    MimeMessageHelper helper = new MimeMessageHelper(message);

    helper.setTo(data.to());
    helper.setSubject(data.subject());
    helper.setText(data.body(), true);
    helper.setFrom(data.from());

    mailSender.send(message);
  }
}
