package app.models;

import java.time.LocalDate;
import java.util.Map;

public class Order {
    private int orderId;
    private User creator;
    private User reviewer;
    private String note;
    private LocalDate date;

    private Map<Jeans, Integer> orderedJeans;

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
