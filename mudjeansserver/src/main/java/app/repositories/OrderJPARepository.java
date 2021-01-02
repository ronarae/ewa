package app.repositories;

import app.models.Notification;
import app.models.Order;
import app.models.OrderJean;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;
import java.util.List;

@Repository
public class OrderJPARepository implements JPARepositoryInterface<Order, Integer> {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    @Transactional
    public List<Order> findByQuery(String jpqlName, Object... params) {
        TypedQuery<Order> query = entityManager.createNamedQuery(jpqlName, Order.class);

        switch (jpqlName) {
            case "Order_find_by_status" -> query.setParameter("status", params[0]);
            case "Order_find_by_date" -> query.setParameter("date", params[0]);
        }

        return query.getResultList();
    }

    @Override
    @Transactional
    public List<Order> findAll() {
        TypedQuery<Order> query = this.entityManager.createQuery(
          "select o from Order_table o", Order.class);
        return query.getResultList();
    }

    @Override
    @Transactional
    public Order save(Order order) {
        return entityManager.merge(order);
    }

    @Override
    @Transactional
    public Order find(Integer id) {
        return entityManager.find(Order.class, id);
    }

    @Override
    @Transactional
    public boolean delete(Integer id) {
        if (find(id) == null) return false;
        entityManager.remove(find(id));
        return true;
    }

    @Transactional
    public OrderJean save(OrderJean orderJean) {
        if (orderJean.getOrder() == null || orderJean.getJeans() == null) {
            return null;
        }

        entityManager.persist(orderJean);

        return orderJean;
    }

    @Transactional
    public void flush() {
        entityManager.flush();
    }

    @Transactional
    public Notification save(Notification n) {
        if (n.getHeader() == null || n.getTarget() == null || n.getMessage() == null) {
            return null;
        }
        entityManager.persist(n);
        return n;
    }

    @Transactional
    public List<OrderJean> findAllByOrder(int orderId) {
        TypedQuery<OrderJean> query = this.entityManager.createNamedQuery("Get_by_order_id", OrderJean.class);
        return query.setParameter("order", find(orderId)).getResultList();
    }

}
