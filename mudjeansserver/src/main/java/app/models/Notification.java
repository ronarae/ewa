package app.models;

import javax.persistence.*;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.io.UnsupportedEncodingException;
import java.util.Date;
import java.util.Properties;

@Entity
public class Notification {
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "id_user")
    private User target;

    @Column(name = "notification_message", nullable = false)
    private String message;

    @Column
    private String header;

    private final transient String SMTP_SERVER = "smtp.googlemail.com";
    private final transient String SMTP_USERNAME = "mudjeansemailtest@gmail.com";
    private final transient String SMTP_PASSWORD = "ybeyhrmjvrxyoghp";
    private final transient String EMAIL_FROM = "mudjeansemailtest@gmail.com";

    public Notification() {}

    public Notification(int id, String header, User target, String message) {
        this.id = id;
        this.target = target;
        this.header = header;
        this.message = message;
    }

    public Notification(User target, String header, String message)  {
        this.target = target;
        this.header = header;
        this.message = message;
    }

    public boolean sendMail() {
        Properties prop = System.getProperties();
        prop.put("mail.smtp.auth", "true");
        prop.put("mail.smtp.starttls.enable", "true");
        prop.put("mail.smtp.host", SMTP_SERVER);
        prop.put("mail.smtp.port", "587");

        Session session = Session.getInstance(prop,
                new javax.mail.Authenticator() {
                    protected PasswordAuthentication getPasswordAuthentication() {
                        return new PasswordAuthentication(SMTP_USERNAME, SMTP_PASSWORD);
                    }
                });

        try {
            Message msg = new MimeMessage(session);

            msg.setFrom(new InternetAddress(EMAIL_FROM, "MUDJEANS AUTOMATIC SYSTEM"));
            msg.setRecipients(Message.RecipientType.TO, InternetAddress.parse(target.getEmail(), false));

            msg.setSubject(header);
            msg.setText(message);
            msg.setSentDate(new Date());

            Transport.send(msg);
            return true;

        } catch (MessagingException | UnsupportedEncodingException e) {
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

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getHeader() {
        return header;
    }

    public void setHeader(String header) {
        this.header = header;
    }
}
