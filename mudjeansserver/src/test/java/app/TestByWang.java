package app;

import app.models.OrderJean;
import app.models.User;
import app.models.Order;
import app.repositories.OrderJPARepository;
import app.repositories.UserJPARepository;
import app.rest.OrderController;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.fasterxml.jackson.databind.SerializationFeature;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.time.LocalDate;
import java.util.List;

import static org.hamcrest.Matchers.containsString;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
public class TestByWang {

    @Autowired
    OrderJPARepository orderJPARepository;

    @Autowired
    UserJPARepository userJPARepository;

    @Autowired
    private MockMvc mvc;

    @Test
    void findOrderById() {
        List<OrderJean> order = orderJPARepository.findAllByOrder(67);
        for (int i = 0; i < order.size(); i++) {
            assertEquals(67, order.get(i).getOrder().getOrderId());
        }
    }

    @Test
    @DirtiesContext
    void testCreateOrder() {
        User system = userJPARepository.find(1);
        User reviewer = userJPARepository.find(20);

        Order order = new Order(system, reviewer, "Adjustment", "Automatic generation", LocalDate.now());
        orderJPARepository.save(order);
    }

    @Test
    void testGetOrdersSummary() throws Exception {
        mvc.perform(MockMvcRequestBuilders.get("/orders/summary"))
                .andDo(print())
                .andExpect(status().is(200))
                .andExpect(jsonPath("$").isNotEmpty());
    }

    @Test
    void testGetOrderById() throws Exception{
        mvc.perform(MockMvcRequestBuilders.get("/orders/{orderId}", 67))
                .andDo(print())
                .andExpect(status().is(200))
                .andExpect(jsonPath("$").isNotEmpty());
    }

    @Test
    void testGetOrderByIdWithFalseId() throws Exception {
        mvc.perform(MockMvcRequestBuilders.get("/orders/{orderId}", 999))
                .andDo(print())
                .andExpect(status().isNotFound())
                .andExpect(status().reason(containsString("Orders with orderId 999 could not be found.")));
    }
}
