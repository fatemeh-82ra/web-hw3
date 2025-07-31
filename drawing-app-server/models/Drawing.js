const mongoose = require('mongoose');

const DrawingSchema = new mongoose.Schema({
    userId: String,  // simplify user handling (default users)
    drawingName: String,
    shapes: Array,
}, { timestamps: true });

module.exports = mongoose.model('Drawing', DrawingSchema);
