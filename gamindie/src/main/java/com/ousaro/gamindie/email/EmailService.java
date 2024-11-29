package com.ousaro.gamindie.email;

import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmailService {
    
    private final JavaMailSender mailSender;
    private final SpringTemplateEngine templateEngine;


    @Async // send email in a separate thread
    public void sendEmail(
        String to, 
        String username, 
        EmailTemplateName emailTemplateName,
        String confirmationUrl,
        String activationCode,
        String subject
    )  throws MessagingException {
        
        String templateName;
        if(emailTemplateName == null){
            templateName = "confirm-email"; // if no template is provided use the default one
        }
        else{
            templateName = emailTemplateName.getName(); // use the provided template
        }

        MimeMessage mimeMessage = mailSender.createMimeMessage(); // mime message is used to send email with attachments
        MimeMessageHelper helper = new MimeMessageHelper( // helper is used to set the email properties
            mimeMessage,
            MimeMessageHelper.MULTIPART_MODE_MIXED, // for attachments if needed
            StandardCharsets.UTF_8.name() // encoding
        );

        Map<String, Object> properties = new HashMap<>();
        properties.put("username", username);
        properties.put("confirmationUrl", confirmationUrl);
        properties.put("activation_code", activationCode);

        Context context = new Context(); // context is used to pass the variables to the template
        context.setVariables(properties);

        helper.setFrom("contact@gamindie.com");
        helper.setTo(to);
        helper.setSubject(subject);

        String template = templateEngine.process(templateName, context); // process the template with the context variables, this will return the html content of the email by replacing the variables with the values and accessing the template from the resources/templates folder

        helper.setText(template, true); // set the email content to the processed template, true means that the content is html

        mailSender.send(mimeMessage);


        
    }

    
}
