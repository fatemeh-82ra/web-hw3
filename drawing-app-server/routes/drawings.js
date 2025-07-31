const express = require('express');
const router = express.Router();
const Drawing = require('../models/Drawing');

// Save or Update Drawing
router.post('/save', async (req, res) => {
    const { userId, drawingName, shapes } = req.body;
    try {
        let drawing = await Drawing.findOneAndUpdate(
            { userId },
            { drawingName, shapes },
            { new: true, upsert: true }
        );
        res.json(drawing);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Retrieve Drawing
router.get('/:userId', async (req, res) => {
    try {
        const drawing = await Drawing.findOne({ userId: req.params.userId });
        res.json(drawing);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
