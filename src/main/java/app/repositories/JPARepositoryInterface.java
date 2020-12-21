package app.repositories;

import java.util.List;

public interface JPARepositoryInterface<E, U> extends RepositoryInterface<E, U> {

    List<E> findByQuery(String jpqlName, Object... params);

}
