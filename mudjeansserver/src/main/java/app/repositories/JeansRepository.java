package app.repositories;

import app.models.Jeans;

import java.util.List;

public interface JeansRepository {
    List<Jeans> findAll();

    Jeans save(Jeans j);

    Jeans find(String productCode);

    Jeans delete(String prodcutCode);
}
