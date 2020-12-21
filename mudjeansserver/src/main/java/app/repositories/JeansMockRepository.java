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
        save(new Jeans("MB0001C001D001-29-32","Regular Bryce ", "ORGANIC CASSIE", "Strong Blue", "MENS BOTTOMS", 1, true));
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
    public boolean delete(String productCode) {
        Iterator<Jeans> it = jeans.iterator();
        while (it.hasNext()) {
            Jeans jeans = it.next();

            if(jeans.getProductCode().equals(productCode)) {
                it.remove();
                return true;
            }
        }
        return false;
    }
}
