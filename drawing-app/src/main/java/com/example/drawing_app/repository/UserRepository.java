package com.example.drawing_app.repository;

import com.example.drawing_app.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // ADDED: Custom query to find a user by their username for login
    Optional<User> findByUsername(String username);
}