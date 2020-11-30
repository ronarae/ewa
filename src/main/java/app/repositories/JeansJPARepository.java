package app.repositories;

import app.models.Jeans;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class JeansJPARepository implements JPARepositoryInterface<Jeans, String> {
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<Jeans> findByQuery(String jpqlName, Object... params) {
        TypedQuery<Jeans> q = entityManager.createNamedQuery(jpqlName, Jeans.class);

        return switch (jpqlName) {
            case "find_all_general_types" -> new ArrayList<>(q.getResultStream().map(Jeans::removeTypeSpecification).collect(Collectors.toSet()));
            case "find_sizes_per_general_type" -> q.setParameter("productCode", params[0]).getResultList();
            default -> q.getResultList();
        };
    }

    @Override
    public List<Jeans> findAll() {
        TypedQuery<Jeans> query = this.entityManager.createQuery(
                "select j from Jeans j", Jeans.class);
        return query.getResultList();
    }

    @Override
    public Jeans save(Jeans jean) {
        if (jean.getProductCode().isEmpty()) {
            return null;
        }
        entityManager.merge(jean);

        return jean;
    }

    @Override
    public Jeans find(String s) {
        return entityManager.find(Jeans.class, s);
    }

    @Override
    public boolean delete(String s) {
        if (find(s) == null) return false;
        entityManager.remove((find(s)));
        return true;
    }
}
