package com.example.drawing_app.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
public class Drawing {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String drawingName;

    // One drawing belongs to one user
    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    @JsonIgnore // Prevent circular reference
    private User user;

    // One drawing has many shapes.
    // CascadeType.ALL: Operations (save, delete) on Drawing are cascaded to its Shapes.
    // orphanRemoval=true: If a Shape is removed from this list, it's deleted from the database.
    @OneToMany(mappedBy = "drawing", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private List<Shape> shapes = new ArrayList<>();

    // Helper method to synchronize both sides of the relationship
    public void setShapes(List<Shape> shapes) {
        this.shapes.clear();
        if (shapes != null) {
            shapes.forEach(shape -> shape.setDrawing(this));
            this.shapes.addAll(shapes);
        }
    }
}