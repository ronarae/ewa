package app.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.SignatureException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.spec.SecretKeySpec;
import javax.naming.AuthenticationException;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Calendar;
import java.util.Date;


@Component
public class JWTokenUtils {

    public static final String JWT_EMAIL_CLAIM = "sub";
    public static final String JWT_ID_CLAIM = "0";
    public static final String JWT_ROLE_CLAIM = "role";

    @Value("${jwt.issuer:MyOrganisation}")
    private String issuer;

    @Value("${jwt.pass-phrase}")
    private String passphrase;

    @Value("${jwt.expiration-seconds}")
    private int expiration;

    @Value("${jwt.refresh-expiration-seconds}")
    private int refreshExpiration;

    public String encode(String email, int id, String role) {
        Key key = getKey(passphrase);

        String token = Jwts.builder()
                .claim(JWT_EMAIL_CLAIM, email)
                .claim(JWT_ID_CLAIM, id)
                .claim(JWT_ROLE_CLAIM, role)
                .setIssuer(issuer)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expiration * 1000))
                .signWith(key)
                .compact();
        return token;
    }

    private Key getKey(String passphrase) {
        byte hmacKey[] = passphrase.getBytes(StandardCharsets.UTF_8);
        Key key = new SecretKeySpec(hmacKey, SignatureAlgorithm.HS512.getJcaName());
        return key;
    }

    public JWTokenInfo decode(String encodedToken) throws AuthenticationException {
        try {
            Key key = getKey(passphrase);

            Jws<Claims> jws = Jwts.parserBuilder().
                    setSigningKey(passphrase.getBytes()).
                    build().
                    parseClaimsJws(encodedToken);

            Claims claims = jws.getBody();

            JWTokenInfo tokenInfo = new JWTokenInfo(
                    claims.get(JWT_EMAIL_CLAIM).toString(),
                    Integer.parseInt(claims.get(JWT_ID_CLAIM).toString()),
                    claims.get(JWT_ROLE_CLAIM).toString(),
                    claims.getIssuedAt(),
                    claims.getExpiration()
            );

            return tokenInfo;
        } catch (ExpiredJwtException | MalformedJwtException |
                UnsupportedJwtException | IllegalArgumentException | SignatureException e) {
            throw new AuthenticationException(e.getMessage());
        }
    }

    public boolean isRenewable(JWTokenInfo tokenInfo) {
        if (tokenInfo.getExpiration().compareTo(new Date()) > 0) {
            return false;
        }

        Calendar cal = Calendar.getInstance();
        cal.setTime(tokenInfo.getIssuedAt());
        cal.add(Calendar.SECOND, refreshExpiration);

        System.out.println("max refresh: " + cal.getTime());
        System.out.println("current date: " + new Date());

        return cal.getTime().compareTo(new Date()) > 0;
    }
}
