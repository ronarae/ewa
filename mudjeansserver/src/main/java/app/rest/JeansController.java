package app.rest;

import app.models.Jeans;
import app.repositories.JeansMockRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
public class JeansController {

    @Autowired
    private JeansMockRepository repository;

    @GetMapping("/jeans")
    public List<Jeans> getAllJeans() {
        return repository.findAll();
    }

    @GetMapping("/jeans/{productCode}")
    public Jeans getJeansByCode(@PathVariable String productCode) {
        Jeans j = repository.find(productCode);

        if (j == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                    "Jeans with productCode " + productCode + " could not be found.");
        }

        return j;
    }

    @PostMapping("/jeans")
    public ResponseEntity<Jeans> createJeans(@RequestBody Jeans j) {
        Jeans savedJeans = repository.save(j);

        URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{productCode}")
                .buildAndExpand(savedJeans.getProductCode()).toUri();

        return ResponseEntity.created(location).body(savedJeans);
    }

    @DeleteMapping("/jeans/{productCode}")
    public ResponseEntity<Jeans> deleteJeans(@PathVariable String productCode) {
        Jeans j = repository.delete(productCode);

        if (j == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                    "Jeans with productCode " + productCode + " could not be found.");
        }

        return ResponseEntity.ok(j);
    }

    @PutMapping("/jeans")
    public ResponseEntity<Object> updateJeans(@RequestBody Jeans j) {
        Jeans old = repository.find(j.getProductCode());

        if (old == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                    "Jeans with productCode " + j.getProductCode() + " could not be found.");
        }

        repository.save(j);

        return ResponseEntity.ok().build();
    }
}
