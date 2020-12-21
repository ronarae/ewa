package app.security;

import java.util.Date;

public class JWTokenInfo {
    public static final String JWT_ATTRIBUTE_NAME = "tokeninfo";

    private String email;
    private int id;
    private String role;
    private Date issuedAt;
    private Date expiration;

    public JWTokenInfo(String email, int id, String role, Date issuedAt, Date expiration) {
        this.email = email;
        this.id = id;
        this.role = role;
        this.issuedAt = issuedAt;
        this.expiration = expiration;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public Date getIssuedAt() {
        return issuedAt;
    }

    public void setIssuedAt(Date issuedAt) {
        this.issuedAt = issuedAt;
    }

    public Date getExpiration() {
        return expiration;
    }

    public void setExpiration(Date expiration) {
        this.expiration = expiration;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
}
