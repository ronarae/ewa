package app.rest;

import app.models.Order;
import app.repositories.OrderMockRepository;;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

public class OrderController {

    @Autowired
    private OrderMockRepository orderMockRepository;

    private URI getLocationURI(long id) {
        URI location = ServletUriComponentsBuilder.fromCurrentRequest().
                path("/{id}").buildAndExpand(id).toUri();
        return location;
    }

    @GetMapping("/orders/summary")
    public List<Order> getOrdersSummary() {
        if (orderMockRepository.findAll().size() != 0) {
            return orderMockRepository.findAll();
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                "There are no orders found.");
    }

    @GetMapping("/orders")
    public List<Order> getAllOrders() {
        return orderMockRepository.findAll();
    }

    @GetMapping("/orders/{orderId}")
    public Order getOrderById(@PathVariable int orderId) {
        Order o = orderMockRepository.find(orderId);
        if (o == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                    "Orders with orderId " + orderId + " could not be found.");
        }
        return o;
    }

    @PostMapping("/orders")
    public ResponseEntity<Order> createOrder(@RequestBody Order o) {
        Order savedOrders = orderMockRepository.save(o);

        URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{orderId}")
                .buildAndExpand(savedOrders.getOrderId()).toUri();

        return ResponseEntity.created(location).body(savedOrders);
    }

    @DeleteMapping("/orders/{orderId}")
    public boolean deleteOrders(@PathVariable int orderId) {
        if (!orderMockRepository.delete(orderId)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                    "Orders with orderId " + orderId + " could not be found.");
        }
        return true;
    }

    @PutMapping("/orders")
    public ResponseEntity updateOrders(@RequestBody Order o) {
        Order old = orderMockRepository.find(o.getOrderId());

        if (old == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                    "Orders with orderId " + o.getOrderId() + " could not be found.");
        }
        orderMockRepository.save(o);

        return ResponseEntity.ok().build();
    }
}
