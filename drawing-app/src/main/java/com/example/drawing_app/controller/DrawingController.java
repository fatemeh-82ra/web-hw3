package com.example.drawing_app.controller;

import com.example.drawing_app.model.Drawing;
import com.example.drawing_app.model.User;
import com.example.drawing_app.repository.DrawingRepository;
import com.example.drawing_app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class DrawingController {

    @Autowired
    private DrawingRepository drawingRepository;

    @Autowired
    private UserRepository userRepository;

    // ADDED: Endpoint to handle user login
    @PostMapping("/users/login")
    public ResponseEntity<User> login(@RequestBody Map<String, String> credentials) {
        String username = credentials.get("username");
        if (username == null || username.trim().isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        return userRepository.findByUsername(username)
                .map(ResponseEntity::ok) // If user exists, return 200 OK with user data
                .orElse(ResponseEntity.status(HttpStatus.UNAUTHORIZED).build()); // Otherwise, return 401 Unauthorized
    }

    // Endpoint to GET a user's drawing
    @GetMapping("/drawings/{userId}")
    public ResponseEntity<Drawing> getDrawingByUserId(@PathVariable Long userId) {
        return drawingRepository.findByUserId(userId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Endpoint to POST (save/update) a user's drawing
    @PostMapping("/drawings/{userId}")
    public ResponseEntity<Drawing> saveOrUpdateDrawing(@PathVariable Long userId, @RequestBody Drawing drawingDetails) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        User user = userOptional.get();

        Drawing drawing = drawingRepository.findByUserId(userId).orElse(new Drawing());

        drawing.setUser(user);
        drawing.setDrawingName(drawingDetails.getDrawingName());
        drawing.setShapes(drawingDetails.getShapes());

        Drawing savedDrawing = drawingRepository.save(drawing);
        return ResponseEntity.ok(savedDrawing);
    }
}