package com.example.drawing_app.controller;

import com.example.drawing_app.model.Drawing;
import com.example.drawing_app.model.User;
import com.example.drawing_app.repository.DrawingRepository;
import com.example.drawing_app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

@RestController
@RequestMapping("/api")
// Allow requests from the default React development server (localhost:3000)
@CrossOrigin(origins = "http://localhost:3000")
public class DrawingController {

    @Autowired
    private DrawingRepository drawingRepository;

    @Autowired
    private UserRepository userRepository;

    // Endpoint to GET a user's drawing
    @GetMapping("/drawings/{userId}")
    public ResponseEntity<Drawing> getDrawingByUserId(@PathVariable Long userId) {
        return drawingRepository.findByUserId(userId)
                .map(ResponseEntity::ok) // If found, return 200 OK with the drawing
                .orElse(ResponseEntity.notFound().build()); // If not found, return 404 Not Found
    }

    // Endpoint to POST (save/update) a user's drawing
    @PostMapping("/drawings/{userId}")
    public ResponseEntity<Drawing> saveOrUpdateDrawing(@PathVariable Long userId, @RequestBody Drawing drawingDetails) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isEmpty()) {
            return ResponseEntity.notFound().build(); // User must exist
        }
        User user = userOptional.get();

        // Find existing drawing or create a new one
        Drawing drawing = drawingRepository.findByUserId(userId).orElse(new Drawing());

        // Update details
        drawing.setUser(user);
        drawing.setDrawingName(drawingDetails.getDrawingName());
        drawing.setShapes(drawingDetails.getShapes()); // Uses the helper method to sync relationships

        Drawing savedDrawing = drawingRepository.save(drawing);
        return ResponseEntity.ok(savedDrawing);
    }
}