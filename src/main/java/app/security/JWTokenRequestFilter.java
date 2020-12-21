package app.security;

import io.jsonwebtoken.Jws;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.naming.AuthenticationException;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Set;

@Component
public class JWTokenRequestFilter extends OncePerRequestFilter {

    // path prefixes that will be protected by the authentication filter
    private static final Set<String> SECURED_PATHS = Set.of("#");

    @Autowired
    private JWTokenUtils tokenUtils;

    @Override
    protected void doFilterInternal(HttpServletRequest req,
                                    HttpServletResponse res,
                                    FilterChain chain) throws IOException, ServletException {

        try {
            String path = req.getServletPath();

            if (HttpMethod.OPTIONS.matches(req.getMethod()) ||
                    SECURED_PATHS.stream().noneMatch(path::startsWith)) {
                chain.doFilter(req, res);
                return;
            }

            String encodedToken = req.getHeader(HttpHeaders.AUTHORIZATION);

            if (encodedToken == null) {
                throw new AuthenticationException("You need to login first.");
            }

            encodedToken = encodedToken.replace("Bearer ", "");
            JWTokenInfo token = tokenUtils.decode(encodedToken);
            req.setAttribute(JWTokenInfo.JWT_ATTRIBUTE_NAME, token);

            chain.doFilter(req, res);
        } catch (AuthenticationException e) {
            res.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Authentication error");
            return;
        }
    }
}
