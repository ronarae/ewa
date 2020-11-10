package app.models;

public class Notification {
    private int id;
    private User target;
    private String targetRole;
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
