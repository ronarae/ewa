package app.models;

import javax.persistence.*;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Date;
import java.util.Properties;

public class Notification {
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "id_gen1")
    @SequenceGenerator(name = "id_gen1", sequenceName = "id_seq1", initialValue = 1, allocationSize = 1)
    private int id;

    @ManyToOne
    private User target;

    @ManyToOne
    @Column(nullable = false)
    private Order order;

    @Column(nullable = true)
    private String targetRole;

    @Column(nullable = false)
    private String message;

    private final String SMTP_SERVER = "smtp.gmail.com ";
    private final String USERNAME = "mudjeansemailtest@gmail.com";
    private final String PASSWORD = "ybeyhrmjvrxyoghp";
    private final String EMAIL_FROM = "mudjeansemailtest@gmail.com";

    public Notification() {}

    public Notification(int id, User target, String targetRole, String message) {
        this.id = id;
        this.target = target;
        this.targetRole = targetRole;
        this.message = message;
    }

    public boolean sendMail() {
        java.util.Properties prop = System.getProperties();
        prop.put("mail.smtp.auth", "true");
        prop.put("mail.smtp.starttls.enable", "true");
        prop.put("mail.smtp.host", SMTP_SERVER);
        prop.put("mail.smtp.port", "587");

        Session session = Session.getInstance(prop,
                new javax.mail.Authenticator() {
                    protected PasswordAuthentication getPasswordAuthentication() {
                        return new PasswordAuthentication(USERNAME, PASSWORD);
                    }
                });

        try {
            Message msg = new MimeMessage(session);

            msg.setFrom(new InternetAddress(EMAIL_FROM));
            msg.setRecipients(Message.RecipientType.TO, InternetAddress.parse(target.getEmail(), false));

            msg.setSubject(order.getOrderId() + " " + order.getNote() + " Created by:" + order.getCreator());
            msg.setText(message);
            msg.setSentDate(new Date());

            Transport.send(msg);
            return true;

        } catch (MessagingException e) {
            e.printStackTrace();
            return false;
        }
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public User getTarget() {
        return target;
    }

    public void setTarget(User target) {
        this.target = target;
    }

    public String getTargetRole() {
        return targetRole;
    }

    public void setTargetRole(String targetRole) {
        this.targetRole = targetRole;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
