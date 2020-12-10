package app.rest;

import app.models.User;
import app.repositories.UserJPARepository;
import app.security.JWTokenInfo;
import app.security.JWTokenUtils;
import app.security.PasswordEncoder;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.naming.AuthenticationException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.net.URI;

@RestController
public class AuthController {
    @Autowired
    private JWTokenUtils tokenGenerator;

    @Autowired
    private PasswordEncoder passWordEncoder;

    @Autowired
    private UserJPARepository userJPARepository;

    @Autowired
    private JWTokenUtils tokenUtils;

    @PostMapping(path = "/auth/login", produces = "application/json")
    public ResponseEntity<Object> postLogin(@RequestBody ObjectNode userInfo, HttpServletRequest request,
                                            HttpServletResponse response) throws AuthenticationException {

        String email = userInfo.get("email").asText();
        System.out.println("MAIL " + email);
        String password = userInfo.get("password").asText();

        try {
            User user = userJPARepository.findByQuery(email).get(0);

            if (!passWordEncoder.encode(password).equals(user.getPassword())) {
                throw new AuthenticationException("Invalid user and/or password");
            }

            User savedUser = userJPARepository.save(user);

            URI location = ServletUriComponentsBuilder.
                    fromCurrentRequest().path("/{id}").
                    buildAndExpand(savedUser.getEmail()).toUri();

            return ResponseEntity.created(location).build();
        } catch (Exception e) {
            throw new AuthenticationException("Invalid user and/or password");
        }
    }

    @PostMapping(path = "/rest/refresh-token", produces = "application/json")
    public ResponseEntity refreshToken(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        String encodedToken = request.getHeader(HttpHeaders.AUTHORIZATION);

        if (encodedToken == null) {
            throw new AuthenticationException("authentication problem");
        }

        encodedToken = encodedToken.replace("Bearer ", "");
        JWTokenInfo tokenInfo = tokenUtils.decode(encodedToken);

        if (!tokenUtils.isRenewable(tokenInfo)) {
            throw new AuthenticationException("Token is not renewable");
        }

        String tokenString = tokenGenerator.encode(tokenInfo.getEmail(), tokenInfo.getId(), tokenInfo.getRole());

        return ResponseEntity.ok().header(HttpHeaders.AUTHORIZATION, "Bearer " + tokenString).build();
    }

    @PostMapping(path = "/rest/auth", produces = "application/json")
    public ResponseEntity<User> authenticateUser(
            @RequestBody ObjectNode signOnInfo,
            HttpServletRequest request,
            HttpServletResponse response)
            throws AuthenticationException {

        String email = signOnInfo.get("email").asText();
        String password = signOnInfo.get("password").asText();

        try {
            User user = userJPARepository.findByQuery(email).get(0);

            if (!passWordEncoder.encode(password).equals(user.getPassword())) {
                throw new AuthenticationException("Invalid user and/or password");
            }

            String tokenString = tokenGenerator.encode(user.getEmail(), user.getId(), user.getRole());

            return ResponseEntity.accepted()
                    .header(HttpHeaders.AUTHORIZATION, "Bearer " + tokenString)
                    .body(user);
        } catch (Exception e) {
            throw new AuthenticationException("Invalid user and/or password");
        }
    }
}
