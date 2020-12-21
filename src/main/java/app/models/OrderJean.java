package app.models;

import javax.persistence.*;
import java.io.Serializable;

@Entity
public class OrderJean implements Serializable {
    @Id
    @ManyToOne
    private Order order;

    @Id
    @ManyToOne
    private Jeans jeans;

    @Column
    int quantity;

    public OrderJean(Order order, Jeans jeans, int quantity) {
        this.order = order;
        this.jeans = jeans;
        this.quantity = quantity;
    }

    public OrderJean() {
    }

    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }

    public Jeans getJeans() {
        return jeans;
    }

    public void setJeans(Jeans jeans) {
        this.jeans = jeans;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}
