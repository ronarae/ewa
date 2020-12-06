package app.rest;
import app.models.User;
import app.repositories.UserJPARepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
public class UserController {

    @Autowired
    private UserJPARepository userJPARepository;

    private URI getLocationURI(long id) {
        URI location = ServletUriComponentsBuilder.fromCurrentRequest().
                path("/{id}").buildAndExpand(id).toUri();
        return location;
    }

    @GetMapping("/users/summary")
    public List<User> getUsersSummary() {
        if (userJPARepository.findAll().size() != 0) {
            return userJPARepository.findAll();
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "There are no users found!");
    }

    @GetMapping("/users")
    public List<User> getAllUsers(@RequestParam(name = "id") Integer id,
                                  @RequestParam(name = "role") String role) {

        if (id != null) {
            return userJPARepository.findByQuery("user_find_by_id", id);
        }
        if (role != null) {
            return userJPARepository.findByQuery("user_find_by_role", role);
        }
        return userJPARepository.findAll();
    }

    @GetMapping("/users/{id}")
    public User getUserById(@PathVariable int id){
        User user = userJPARepository.find(id);
        if (user == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                    "Users with id " + id + " could not be found.");
        }
        return userJPARepository.find(id);
    }

    @PostMapping("/users")
    public ResponseEntity<User> createUser(@RequestBody User user) {
        user.setId(0);
        User createdUser = userJPARepository.save(user);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(createdUser.getId()).toUri();
        return ResponseEntity.created(location).body(createdUser);
    }

    @PutMapping("/users/{id}")
    public ResponseEntity<User> saveUser(@PathVariable Integer id, @RequestBody User user) throws ResponseStatusException{
    if (id == user.getId()) {
        User updatedUser = userJPARepository.save(user);
        return ResponseEntity.created(getLocationURI(updatedUser.getId())).body(updatedUser);
    }

    if (id == null) {
        throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                "User with the ID " + user.getId() + " could not be found.");
    }
    throw new ResponseStatusException(HttpStatus.PRECONDITION_FAILED, "The requested ID does not meet the ID provided in the body");
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<Boolean> deleteByUserId(@PathVariable int id) throws ResponseStatusException {
        if(userJPARepository.delete(id)) {
            return ResponseEntity.ok(true);
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Cannot delete the User because the provided ID: " + id + " does not exist");
    }

}
