package app.models;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;

@Entity
public class Order {
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "id_gen3")
    @SequenceGenerator(name = "id_gen3", sequenceName = "id_seq3", initialValue = 1, allocationSize = 1)
    private int orderId;

    @ManyToOne
    private User creator;

    @ManyToOne
    private User reviewer;

    private String note;
    private LocalDate date;


    public Order() {
    }

    public Order(int orderId, User creator, User reviewer, String note, LocalDate date) {
        this.orderId = orderId;
        this.creator = creator;
        this.reviewer = reviewer;
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
}
