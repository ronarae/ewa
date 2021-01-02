package app.rest;

import app.models.Order;
import app.models.OrderJean;
import app.repositories.JeansJPARepository;
import app.repositories.OrderJPARepository;
;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
public class OrderController {

    @Autowired
    private OrderJPARepository orderRepository;

    @Autowired
    private JeansJPARepository jeansRepository;

    private URI getLocationURI(long id) {
        URI location = ServletUriComponentsBuilder.fromCurrentRequest().
                path("/{id}").buildAndExpand(id).toUri();
        return location;
    }

    @GetMapping("/orders/summary")
    public List<Order> getOrdersSummary() {
        if (orderRepository.findAll().size() != 0) {
            return orderRepository.findAll();
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                "There are no orders found.");
    }

    @GetMapping("/orders")
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    @GetMapping("/orders/{orderId}")
    public Order getOrderById(@PathVariable int orderId) {
        Order o = orderRepository.find(orderId);
        if (o == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                    "Orders with orderId " + orderId + " could not be found.");
        }
        return o;
    }

    @PostMapping("/orders")
    public ResponseEntity<Order> createOrder(@RequestBody Order o) {
        Order savedOrders = orderRepository.save(o);

        URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{orderId}")
                .buildAndExpand(savedOrders.getOrderId()).toUri();

        return ResponseEntity.created(location).body(savedOrders);
    }

    @DeleteMapping("/orders/{orderId}")
    public boolean deleteOrders(@PathVariable int orderId) {
        if (!orderRepository.delete(orderId)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                    "Orders with orderId " + orderId + " could not be found.");
        }
        return true;
    }

    @PutMapping("/orders")
    public ResponseEntity updateOrders(@RequestBody ObjectNode o) {
        Order order = orderRepository.find(o.get("idOrder").asInt());
        if (order == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                    "Orders with orderId " + o.get("idOrder").asInt() + " could not be found.");
        }

        order.setStatus("Adjustment");
        orderRepository.save(order);

        JsonNode arrNode = o.get("jeansArray");
        if (arrNode.isArray()) {
            for(JsonNode jsonNode : arrNode) {
                String productCode = jsonNode.get("jean").get("productCode").asText();
                int quantity = jsonNode.get("quantity").asInt();
                orderRepository.merge(new OrderJean(order, jeansRepository.find(productCode), quantity));
            }
        }

        return ResponseEntity.ok().build();
    }

    @GetMapping("/orders/pending")
    public List<Order> getPendingOrders() {
        return orderRepository.findByQuery("Order_find_by_status", "Pending");
    }

    @GetMapping("/orders/orderjeans/{orderId}/{page}")
    public List<OrderJean> getOrderJeanById(@PathVariable int orderId, @PathVariable int page) {
        return orderRepository.findAllByOrder(orderId, page);
    }
}
