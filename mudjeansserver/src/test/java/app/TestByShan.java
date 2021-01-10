package app;

import app.models.Jeans;
import app.repositories.JeansJPARepository;
import app.repositories.JeansMockRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.fasterxml.jackson.databind.SerializationFeature;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.junit.jupiter.api.Assertions.assertNull;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
public class TestByShan {

    @Autowired
    private JeansMockRepository jeansMockRepository;

    @Autowired
    private MockMvc mvc;

    @Test
    void testAddingJeans() {
        Jeans jean1 = new Jeans("010101testcode", "Shans Jeans", "Shans fabric", "Shans washing",
                "Womens Category", 24, true);

        jeansMockRepository.save(jean1);
    }

    @Test
    void testRemoveJean() {
        jeansMockRepository.delete("AC0005R011D007-1");
        assertNull(jeansMockRepository.find("MUD TOTO"));
    }

    @Test
    public void testGetAllJeans() throws Exception
    {
        mvc.perform( MockMvcRequestBuilders
                .get("/jeans")
                .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isNotEmpty());
    }


    @Test
    public void testDeleteNonExistingJean() throws Exception {
        mvc.perform(MockMvcRequestBuilders.delete("/jeans/{productCode}", "RANDOMJEANCODE"))
                .andExpect(status().isNotFound());
    }


    @Test
    public void testPostJean() throws Exception {
        Jeans jeansObject = new Jeans();
        jeansObject.setProductCode("TESTCODE");
        jeansObject.setFabric("TESTFABRIC");
        jeansObject.setProductCategory("TESTCATEGORY");
        jeansObject.setLatestStock(0);
        jeansObject.setShouldOrder(false);
        jeansObject.setStyleName("TESTSTYLENAME");
        jeansObject.setWashing("TESTWASHING");

        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
        ObjectWriter ow = mapper.writer().withDefaultPrettyPrinter();
        String requestJson=ow.writeValueAsString(jeansObject );

        mvc.perform(post("/jeans").contentType(MediaType.APPLICATION_JSON)
                .content(requestJson))
                .andExpect(status().isCreated());
    }

}


