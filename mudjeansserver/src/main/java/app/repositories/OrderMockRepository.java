package app.repositories;

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
        Order order = new Order(null, null, "Accepted", "note order 0", LocalDate.now());

        orders.add(order);

        Order order1 = new Order(null, null, "Accepted", "note order 1", LocalDate.now());
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
    public boolean delete(Integer id) {
        Iterator<Order> it = orders.iterator();
        while (it.hasNext()) {
            Order order = it.next();

            if(order.getOrderId() == id) {
                it.remove();
                return true;
            }
        }
        return false;
    }
}
