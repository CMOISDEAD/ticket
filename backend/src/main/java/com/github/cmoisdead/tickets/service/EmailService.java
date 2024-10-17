package com.github.cmoisdead.tickets.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.github.cmoisdead.tickets.dto.utils.EmailDTO;
import com.google.zxing.WriterException;
import com.itextpdf.io.exceptions.IOException;

import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {
  @Autowired
  private JavaMailSender mailSender;

  @Autowired
  private QRCodeService qrCodeService;

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

  public void sendEmailWithQRCode(EmailDTO data, String qrContent) throws Exception {
    // Generar el código QR en Base64
    String qrCodeBase64;
    try {
      qrCodeBase64 = qrCodeService.generateQRCode(qrContent);
    } catch (WriterException | IOException e) {
      throw new Exception("Error al generar el código QR", e);
    }

    MimeMessage message = mailSender.createMimeMessage();
    MimeMessageHelper helper = new MimeMessageHelper(message, true);

    helper.setTo(data.to());
    helper.setSubject(data.subject());

    String htmlBody = "<html>"
        + "<body>"
        + "<h3>" + data.body() + "</h3>"
        + "<p>Por favor escanea el siguiente código QR:</p>"
        + "<img src='data:image/png;base64," + qrCodeBase64 + "' alt='Código QR'/>"
        + "</body>"
        + "</html>";

    helper.setText(htmlBody, true);
    helper.setFrom(data.from());

    mailSender.send(message);
  }
}
