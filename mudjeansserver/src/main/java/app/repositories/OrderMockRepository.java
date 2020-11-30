package app.repositories;

import app.models.Jeans;
import app.models.Order;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class OrderMockRepository implements RepositoryInterface<Order, Integer> {
    private List<Order> orders;

    public OrderMockRepository() {
        orders = new ArrayList<>();
        addRandomData();
    }

    private void addRandomData() {
        Order order = new Order(0, null, null, "note order 0", LocalDate.now());
        order.addToOrder(new Jeans("MB0004S001D001-28-32", "Slim Lassen - Strong Blue - W28 L32", "All", "RCY-Dave"), 10);
        order.addToOrder(new Jeans("MB0004S001D001-29-32", "Slim Lassen - Strong Blue - W28 L32", "All", "RCY-Dave"), 20);

        orders.add(order);

        Order order1 = new Order(1, null, null, "note order 1", LocalDate.now());
        order1.addToOrder(new Jeans("MB0004S001D001-30-32", "Slim Lassen - Strong Blue - W30 L32", "All", "RCY-Dave"), 10);
        order1.addToOrder(new Jeans("MB0004S001D001-32-32", "Slim Lassen - Strong Blue - W32 L32", "All", "RCY-Dave"), 20);
    }

    @Override
    public List<Order> findAll() {
        return orders;
    }

    @Override
    public Order save(Order order) {
        int index = orders.indexOf(order);

        if (index == -1) {
            orders.add(order);
        } else {
            orders.set(index, order);
        }

        return order;
    }

    @Override
    public Order find(Integer id) {
        for (Order order : orders) {
            if (order.getOrderId() == id) {
                return order;
            }
        }
        return null;
    }

    @Override
    public Order delete(Integer id) {
        Iterator<Order> it = orders.iterator();
        while (it.hasNext()) {
            Order order = it.next();

            if(order.getOrderId() == id) {
                it.remove();
                return order;
            }
        }
        return null;
    }
}
