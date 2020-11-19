package app.repositories;

import java.util.List;

public interface RepositoryInterface<E, U> {
    List<E> findAll();

    E save(E e);

    E find(U u);

    E delete(U u);
}
