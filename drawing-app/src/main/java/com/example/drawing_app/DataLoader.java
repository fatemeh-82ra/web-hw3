package com.example.drawing_app;

import com.example.drawing_app.model.User;
import com.example.drawing_app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataLoader implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() == 0) {
            userRepository.save(new User("user1"));
            userRepository.save(new User("user2"));
            System.out.println("Created default users: user1, user2");
        }
    }
}