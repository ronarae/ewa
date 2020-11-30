package app.models;

import javax.persistence.*;

public class Notification {
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "id_gen1")
    @SequenceGenerator(name = "id_gen1", sequenceName = "id_seq1", initialValue = 1, allocationSize = 1)
    private int id;

    @ManyToOne
    private User target;

    @ManyToOne
    @Column(nullable = false)
    private Order order;

    @Column(nullable = true)
    private String targetRole;

    @Column(nullable = false)
    private String message;

    public Notification(){}

    public Notification(int id, User target, String targetRole, String message) {
        this.id = id;
        this.target = target;
        this.targetRole = targetRole;
        this.message = message;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public User getTarget() {
        return target;
    }

    public void setTarget(User target) {
        this.target = target;
    }

    public String getTargetRole() {
        return targetRole;
    }

    public void setTargetRole(String targetRole) {
        this.targetRole = targetRole;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
