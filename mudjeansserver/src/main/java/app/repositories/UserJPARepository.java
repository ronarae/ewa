package app.repositories;

import app.models.User;
import app.security.PasswordEncoder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional
public class UserJPARepository implements JPARepositoryInterface<User, Integer> {
    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Transactional
    @Override
    public List<User> findByQuery(String jpqlName, Object... params) {
        TypedQuery<User> query = entityManager.createNamedQuery(jpqlName, User.class);

        switch (jpqlName) {
            case "user_find_by_id" -> {
                return query.setParameter("id", params[0]).getResultList();
            }
            case "user_find_by_role" -> {
                return query.setParameter("role", params[0]).getResultList();
            }
            case "user_find_by_email" -> {
                return query.setParameter("email", params[0]).getResultList();
            }
            case "user_find_by_name" -> {
                return query.setParameter("name", params[0]).getResultList();
            }
            default -> {
                return null;
            }
        }
    }

    @Override
    public List<User> findAll() {
        TypedQuery<User> q = this.entityManager.createQuery(
                "select u from User_table u", User.class);
        return q.getResultList();
    }

    @Override
    public User save(User user) {
        if (user.getId() == 0) {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            return entityManager.merge(user);
        }
        if (findByQuery("user_find_by_email", user.getEmail()).get(0).getPassword().equals(user.getPassword())) {
            user.setPassword(findByQuery("user_find_by_email", user.getEmail()).get(0).getPassword());
        } else {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
        }
        return entityManager.merge(user);
    }

    @Override
    public User find(Integer id) {
        return entityManager.find(User.class, id);
    }

    @Override
    public boolean delete(Integer id) {
        System.out.println(find(id));
        if (find(id) != null) {
            entityManager.remove(find(id));
            return true;
        }
        return false;
    }
}
