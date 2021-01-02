package app.models;

import javax.persistence.*;

@Entity(name = "User_table")
@NamedQueries({
        @NamedQuery(name = "user_find_by_id",
        query = "select u from User_table u where u.id = :id"),

        @NamedQuery(name = "user_find_by_role",
        query = "select u from User_table u where u.role = :role"),

        @NamedQuery(name = "user_find_by_email",
        query = "select u from User_table u where u.email = :email"),

        @NamedQuery(name = "user_find_by_name",
                query = "select u from User_table u where u.name = :name")
})
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_user")
    private int id;
    @Column
    private String name;
    @Column
    private String role;
    @Column
    private String password;
    @Column
    private String email;

    public User(){}

    public User(int id, String name, String role, String password, String email) {
        this.id = id;
        this.name = name;
        this.role = role;
        this.password = password;
        this.email = email;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
