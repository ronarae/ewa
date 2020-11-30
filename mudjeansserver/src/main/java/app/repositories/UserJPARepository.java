package app.repositories;

import app.models.User;
import org.jboss.jandex.TypeTarget;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;
import java.util.List;

public class UserJPARepository implements JPARepositoryInterface<User, Integer> {
    @PersistenceContext
    private EntityManager entityManager;

    @Transactional
    @Override
    public List<User> findByQuery(String jpqlName, Object... params) {
        TypedQuery<User> query = entityManager.createNamedQuery(jpqlName, User.class);

        switch (jpqlName) {
            case "user_find_by_id":
                query.setParameter("id", params[0]);
                break;
            case "user_find_by_role":
                query.setParameter("role", params[0]);
                break;
        }

        return query.setParameter("id", params[0]).getResultList();
    }

    @Override
    public List<User> findAll() {
        TypedQuery<User> q = entityManager.createQuery("select u from User u", User.class);
        return q.getResultList();
    }

    @Override
    public User save(User user) {
        if (user.getId() == 0) {
            entityManager.persist(user);
        } else {
            entityManager.merge(user);
        }
        return user;
    }

    @Override
    public User find(Integer id) {
        return entityManager.find(User.class, id);
    }

    @Override
    public boolean delete(Integer id) {
        if(find(id) != null) return false;
        entityManager.remove(find(id));
        return true;
    }
}
