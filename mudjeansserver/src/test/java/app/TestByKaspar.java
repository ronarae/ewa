package app;

import app.models.User;
import app.repositories.JPARepositoryInterface;
import app.repositories.UserJPARepository;
import app.rest.AuthController;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.junit.Assert;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.client.HttpClientErrorException;

import javax.naming.AuthenticationException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.util.ArrayList;

import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class TestByKaspar {

    @Autowired
    private UserJPARepository userJPARepository;

    @Autowired
    private MockMvc mvc;

    @Autowired
    private AuthController authController;

    @BeforeEach
    public void addData() {
        // Add test users
        userJPARepository.save(new User(0, "test", "admin", "test", "test@test.com"));
        userJPARepository.save(new User(0, "test2", "viewer", "test", "test2@test.com"));
    }

    @AfterEach
    public void removeData() {
        // Delete test users
        userJPARepository.delete(userJPARepository.findByQuery("user_find_by_email", "test@test.com").get(0).getId());
        userJPARepository.delete(userJPARepository.findByQuery("user_find_by_email", "test2@test.com").get(0).getId());
    }

    @Test
    public void findByNameShouldHaveTheSameName() {
        // Find and get test user with the name test2
        ArrayList<User> allUsers = new ArrayList<>(userJPARepository
                .findByQuery("user_find_by_name", "test2"));
        User userOne = allUsers.get(0);

        // Check if the found user has the same name
        Assert.assertEquals("test2", userOne.getName());
    }

    @Test
    public void findAllShouldReturnAllUsersAndHaveSameNames() {
        // Find and get test users
        ArrayList<User> allUsers = new ArrayList<>(userJPARepository.findAll());
        User userOne = allUsers.get(allUsers.size()-2);
        User userTwo = allUsers.get(allUsers.size()-1);

        // Check if the found users have the same names
        Assert.assertEquals("test", userOne.getName());
        Assert.assertEquals("test2", userTwo.getName());
    }

    @Test
    public void findAllShouldReturnAllUsersUsingRestEndPoint() throws Exception {
        mvc.perform( MockMvcRequestBuilders
                .get("/users")
                .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isNotEmpty());
    }


    @Test
    public void existentUserCanGetToken() throws Exception {
        // Set email and password
        String email = "test@test.com";
        String password = "test";

        String body = "{\"eMail\":\"" + email + "\", \"passWord\":\"" + password + "\"}";

        // Use rest endpoint to create token
        mvc.perform(MockMvcRequestBuilders.post("/auth/login").contentType(MediaType.APPLICATION_JSON)
                .content(body))
                .andExpect(status().isAccepted()).andReturn();
    }

    @Test
    public void nonexistentUserCannotGetTokenAndGetsAuthenticateException() throws Exception {
        // Set email and password
        String email = "nonexistinguser";
        String password = "password";

        String body = "{\"eMail\":\"" + email + "\", \"passWord\":\"" + password + "\"}";

        // Make sure mvc can handel exceptions
        mvc = MockMvcBuilders.standaloneSetup(authController)
                .setControllerAdvice(new AuthenticationException())
                .build();

        // Use rest endpoint to create token
        mvc.perform(MockMvcRequestBuilders.post("/auth/login").contentType(MediaType.APPLICATION_JSON)
                .content(body))
                .andExpect(status().isUnauthorized())
                .andExpect(result -> Assert.assertTrue(result.getResolvedException() instanceof HttpClientErrorException.Unauthorized))
                .andExpect(result -> Assert.assertEquals("Invalid user and/or password", result.getResolvedException().getMessage()));
    }
}
