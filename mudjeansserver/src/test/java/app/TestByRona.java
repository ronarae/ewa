package app;

import app.models.User;
import app.repositories.UserJPARepository;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class TestByRona {

    @Autowired
    private UserJPARepository userJPARepository;

    @Autowired
    private MockMvc mvc;

    @Test
    void testFindingUser() {
        User u = userJPARepository.find(20);
        assertEquals("Dion", u.getName());
    }

    @Test
    void testFindingUserByEmail() {
        //find and get user with an email dion@mudjean.eu
        ArrayList<User> allUserEmail = new ArrayList<>(userJPARepository.findByQuery("user_find_by_email", "dion@mudjeans.eu"));
        User u = allUserEmail.get(0);
        assertEquals("dion@mudjeans.eu", u.getEmail());
    }

    @Test
    @DirtiesContext
    void testUpdatingAUserName() {
      User u = userJPARepository.find(112);
      u.setName("JohnTest");
      userJPARepository.save(u);
      u = userJPARepository.find(112);
      assertEquals("JohnTest", u.getName());
    }

    @Test
    @DirtiesContext
    void testRemovingAUser() {
        User u = userJPARepository.find(117);
        userJPARepository.delete(u.getId());

        assertNull(userJPARepository.find(177));
    }

    @Test
    void testAddingAUser() {
        User u = new User(0, "TestUser", "viewer", "testpassword", "test@test.test");

        u = userJPARepository.save(u);
        assertNotNull(u.getId());

        u = userJPARepository.find(u.getId());
        assertEquals("TestUser", u.getName());
    }

    @Test
    void testGetUserById() throws Exception{
        mvc.perform(MockMvcRequestBuilders
                .get("/users/", 1))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isNotEmpty());
    }

}
