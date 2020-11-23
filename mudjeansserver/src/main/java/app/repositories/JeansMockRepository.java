package app.repositories;

import app.models.Jeans;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@Repository
public class JeansMockRepository implements RepositoryInterface<Jeans, String> {
    List<Jeans> jeans;

    public JeansMockRepository() {
        jeans = new ArrayList<>();
        addRandomJeans();
    }

    private void addRandomJeans() {
        save(new Jeans("jeans01", "Mock jeans 1", "All", "RCY-Dave"));
        save(new Jeans("jeans02", "Mock jeans 2", "Spring", "RCY-Dave"));
        save(new Jeans("jeans03", "Mock jeans 3", "Autumn", "RCY-Dave"));
        save(new Jeans("jeans04", "Mock jeans 4", "Autumn", "RCY-Dave"));
        save(new Jeans("jeans05", "Mock jeans 5", "Summer", "RCY-Dave"));
    }

    @Override
    public List<Jeans> findAll() {
        return jeans;
    }

    @Override
    public Jeans save(Jeans j) {
        int index = jeans.indexOf(j);

        if (index == -1) {
            jeans.add(j);
        } else {
            jeans.set(index, j);
        }

        return j;
    }

    @Override
    public Jeans find(String productCode) {
        for(Jeans j : jeans) {
            if (productCode.equals(j.getProductCode())) {
                return j;
            }
        }
        return null;
    }

    @Override
    public Jeans delete(String productCode) {
        Iterator<Jeans> it = jeans.iterator();
        while (it.hasNext()) {
            Jeans jeans = it.next();

            if(jeans.getProductCode().equals(productCode)) {
                it.remove();
                return jeans;
            }
        }
        return null;
    }
}
