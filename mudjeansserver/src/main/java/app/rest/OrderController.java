package app.rest;

import app.models.Notification;
import app.models.Order;
import app.models.OrderJean;
import app.models.User;
import app.repositories.JeansJPARepository;
import app.repositories.OrderJPARepository;
;
import app.repositories.UserJPARepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.time.LocalDate;
import java.util.List;
import java.util.Random;

@RestController
public class OrderController {

    @Autowired
    private OrderJPARepository orderRepository;

    @Autowired
    private JeansJPARepository jeansRepository;

    @Autowired
    private UserJPARepository userRepository;

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
    public ResponseEntity<Order> createOrder(@RequestBody ObjectNode o) {
        if (o.get("idOrder").asInt() != 0) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                    "Orders with orderId " + o.get("idOrder").asInt() + " could not be found.");
        }

        Order order = createNewOrder(o);

        if (order.getCreator() != order.getReviewer()) {
            String header = "An order with id " + order.getOrderId() + " has been created by " + order.getCreator().getName();
            String message = "An order has been created by " + order.getCreator() + " with the following id: " + order.getOrderId() + ", please review it when you have time.";
            Notification notification = new Notification(order.getReviewer(), header, message);
            orderRepository.save(notification);
            notification.sendMail();
        }

        URI location = getLocationURI(order.getOrderId());

        return ResponseEntity.created(location).body(order);
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


    @GetMapping("/orders/notpending")
    public List<Order> getNotPendingOrders() {
        return orderRepository.findByQuery("Order_find_by_not_pending", "Pending");
    }

    @GetMapping("/orders/orderjeans/{orderId}/{page}")
    public List<OrderJean> getOrderJeanById(@PathVariable int orderId, @PathVariable int page) {
        return orderRepository.findAllByOrder(orderId, page);
    }

    private Order createNewOrder(ObjectNode o) {
        User u = userRepository.findByQuery("user_find_by_name", o.get("idUser").asText()).get(0);

        // Get all administrators.
        List<User> reviewers = userRepository.findByQuery("user_find_by_role", "admin");

        // Remove system from administrators list and save it to a usable variable.
        reviewers.remove(0);

        // Create random for assigning a random administrator to the order (system has been removed as a reviewer).
        Random rand = new Random();
        User r = reviewers.get(rand.nextInt(reviewers.size()));

        String status = "Pending";
        if (u.getRole().equals("admin")) {
            r = u;
            status = "Accepted";
        }

        Order order = new Order(u, r, status, o.get("note").asText(), LocalDate.now());
        Order savedOrder = orderRepository.save(order);
        orderRepository.flush();

        JsonNode arrNode = o.get("jeansArray");
        if (arrNode.isArray()) {
            for(JsonNode jsonNode : arrNode) {
                String productCode = jsonNode.get("jean").get("productCode").asText();
                int quantity = jsonNode.get("quantity").asInt();
                OrderJean oj = new OrderJean(savedOrder, jeansRepository.find(productCode), quantity);
                orderRepository.save(oj);
                orderRepository.flush();
            }
        }

        return savedOrder;
    }
}
