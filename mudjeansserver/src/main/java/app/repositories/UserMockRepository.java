package app.repositories;

import app.models.User;

import java.util.ArrayList;
import java.util.List;

public class UserMockRepository implements RepositoryInterface<User, Integer> {
    private final List<User> users;
    private static int userId = 1;

    public UserMockRepository() {
        this.users = new ArrayList<>();
    }

    @Override
    public List<User> findAll() {
        return users;
    }

    @Override
    public User save(User user) {
        if (user.getId() == 0) {
            user.setId(UserMockRepository.userId++);
            users.add(user);
            return user;
        }
        int index = users.indexOf(find(user.getId()));
        users.set(index, user);
        return find(user.getId());
    }

    @Override
    public User find(Integer id) {
        for (User user: this.users) {
            if (user.getId() == id) {
                return user;
            }
        }
        return null;
    }

    @Override
    public User delete(Integer id) {
        User user = find(id);
        if (user != null){
            this.users.remove(user);
        }
        return null;
    }
}
