package com.example.drawing_app.repository;

import com.example.drawing_app.model.Drawing;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface DrawingRepository extends JpaRepository<Drawing, Long> {
    // Custom query to find a drawing by the user's ID
    Optional<Drawing> findByUserId(Long userId);
}