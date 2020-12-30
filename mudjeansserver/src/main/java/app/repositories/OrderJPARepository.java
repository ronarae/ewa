package app.repositories;

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
            case "Order_find_by_status":
                query.setParameter("status", params[0]);
                break;
            case "Order_find_by_date":
                query.setParameter("date", params[0]);
                break;
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
        if (order.getOrderId() == 0) {
            return null;
        }
        entityManager.merge(order);
        return order;
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

        entityManager.merge(orderJean);

        return orderJean;
    }
}
