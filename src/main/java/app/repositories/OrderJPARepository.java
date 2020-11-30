package app.repositories;

import app.models.Order;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import java.util.List;

public class OrderJPARepository implements JPARepositoryInterface<Order, Integer> {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<Order> findByQuery(String jpqlName, Object... params) {
        TypedQuery<Order> order = entityManager.createNamedQuery(jpqlName, Order.class);

        return null;
    }

    @Override
    public List<Order> findAll() {
        TypedQuery<Order> query = this.entityManager.createQuery(
          "select o from Order o", Order.class);
        return query.getResultList();
    }

    @Override
    public Order save(Order order) {

        if (order.getOrderId() == 0) {
            return null;
        }
        entityManager.merge(order);
        return order;
    }

    @Override
    public Order find(Integer id) {
        return entityManager.find(Order.class, id);
    }

    @Override
    public boolean delete(Integer id) {
        if (find(id) == null) return false;
        entityManager.remove(find(id));
        return true;
    }
}
