package com.github.cmoisdead.tickets.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.github.cmoisdead.tickets.dto.utils.EmailDTO;
import com.google.zxing.WriterException;
import com.itextpdf.io.exceptions.IOException;

import jakarta.mail.internet.MimeMessage;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.util.Objects;

@Service
public class EmailService {
    @Autowired
    private JavaMailSender mailSender;
    @Autowired
    private TemplateEngine templateEngine;

    @Autowired
    private QRCodeService qrCodeService;


    public void sendEmail(EmailDTO data) throws Exception {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);
        String processedTemplate;

        if (data.isHtml()) {
            helper.setTo(data.to());
            helper.setSubject(data.subject());
            helper.setFrom(data.from());
            Context context = new Context();
            context.setVariable("token", data.body());

            if (Objects.equals(data.type(), "login"))
                processedTemplate = templateEngine.process("login", context);
            else if (Objects.equals(data.type(), "register"))
                processedTemplate = templateEngine.process("confirm", context);
            else if (Objects.equals(data.type(), "recover"))
                processedTemplate = templateEngine.process("recover", context);
            else if (Objects.equals(data.type(), "coupon"))
                processedTemplate = templateEngine.process("coupon", context);
            else if (Objects.equals(data.type(), "activate"))
                processedTemplate = templateEngine.process("activate", context);
            else if (Objects.equals(data.type(), "desactivate"))
                processedTemplate = templateEngine.process("desactivate", context);
            else throw new Exception("Tipo de correo no válido");

            helper.setText(processedTemplate, true);

            mailSender.send(message);
        } else {
            throw new Exception("El contenido del correo debe ser HTML");
        }
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
