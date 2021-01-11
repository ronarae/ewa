package app;

import app.models.Notification;
import app.models.Order;
import app.models.User;
import app.repositories.OrderJPARepository;
import app.repositories.UserJPARepository;
import app.rest.FileUploadController;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Files;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class TestsByJimi {
    @Autowired
    private FileUploadController controller;

    @Autowired
    private MockMvc mvc;

    @Autowired
    private UserJPARepository userJPARepository;
    @Autowired
    private OrderJPARepository orderJPARepository;


    @Test
    public void TJ01_shouldCalculateTotalCorrectly() {
        List<String> checkList = Arrays.asList("MB0001C001D001-29-32", "94", "32",
                "MB0001C001D001-29-34", "26", "5", "MB0001C001D001-30-32", "107", "7");

        assertEquals(227, controller.calculateTotal(checkList, 1).get("MB0001C001D001"));
    }

    @Test
    public void TJ02_endPointShouldNotWorkWithOutFile() throws Exception {
        mvc.perform(MockMvcRequestBuilders.post("/upload", new MockMultipartFile("test", (byte[]) null))
                .contentType(MediaType.MULTIPART_FORM_DATA_VALUE))
                .andExpect(status().isBadRequest());
    }

    @Test
    public void TJ03_shouldSaveAndFindUser() {
        User user = new User();
        user.setId(0);
        user.setPassword("Password");
        user.setEmail("test@test.nl");
        user.setName("John");
        user.setRole("viewer");

        userJPARepository.save(user);

        List<User> queryResult = userJPARepository.findByQuery("user_find_by_name", "John");

        assertFalse(queryResult.isEmpty());
        assertNotNull(queryResult.get(0));
    }

    @Test
    public void TJ04_shouldSaveNotification() {
        Notification note = new Notification();
        note.setHeader("New notification");
        note.setMessage("New message");
        note.setTarget(userJPARepository.find(20));

        assertNotNull(orderJPARepository.save(note));
    }

    @Test
    public void TJ05_shouldThrowIOException() {
        assertThrows(IOException.class, () -> {
            File file = new File("/home/jimi/IdeaProjects/mudjeans-1/mudjeansserver/src/main/resources/KopievanSalesAnalysisHvA.xlsx");
            MockMultipartFile mock = new MockMultipartFile("Sales analysis", Files.readAllBytes(file.toPath()));

            List<String> resultList = controller.readFile(mock);
        });
    }
}
