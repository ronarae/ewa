package app.security;

import com.google.common.hash.Hashing;
import org.springframework.stereotype.Component;
import java.nio.charset.StandardCharsets;

@Component
public class PasswordEncoder {

    public String encode(String text) {
        return Hashing.sha512()
                .hashString(text, StandardCharsets.UTF_8)
                .toString();
    }
}
