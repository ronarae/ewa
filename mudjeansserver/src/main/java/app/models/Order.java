package app.models;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;

@Entity(name = "Order_table")
@NamedQueries({
        @NamedQuery(name = "Order_find_by_status", query = "select o from Order_table o where o.status = :status"),
        @NamedQuery(name = "Order_find_by_date",
                query = "select o from Order_table o where o.date = :date"),

})
public class Order {
    @Id
    @Column(name = "id_order")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int orderId;

    @ManyToOne
    @JoinColumn(name = "id_user")
    private User creator;

    @ManyToOne
    @JoinColumn(name = "id_reviewer")
    private User reviewer;

    @Column
    private String status;
    @Column
    private String note;
    @Column
    private LocalDate date;


    public Order() {
    }

    public Order(int orderId, User creator, User reviewer, String status, String note, LocalDate date) {
        this.orderId = orderId;
        this.creator = creator;
        this.reviewer = reviewer;
        this.status = status;
        this.note = note;
        this.date = date;
    }

    public Order(User creator, User reviewer, String status, String note, LocalDate date) {
        this.creator = creator;
        this.reviewer = reviewer;
        this.status = status;
        this.note = note;
        this.date = date;
    }


    public int getOrderId() {
        return orderId;
    }

    public void setOrderId(int orderId) {
        this.orderId = orderId;
    }

    public User getCreator() {
        return creator;
    }

    public void setCreator(User creator) {
        this.creator = creator;
    }

    public User getReviewer() {
        return reviewer;
    }

    public void setReviewer(User reviewer) {
        this.reviewer = reviewer;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
