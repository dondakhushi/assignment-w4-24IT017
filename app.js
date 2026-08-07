const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const Task = require('./models/Task');

const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB connected');
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
    });


// CREATE TASK
app.post('/tasks', async (req, res, next) => {
    try {
        const task = await Task.create(req.body);

        res.status(201).json(task);
    } catch (err) {
        next(err);
    }
});


// GET ALL TASKS
app.get('/tasks', async (req, res, next) => {
    try {
        const tasks = await Task.find();

        res.json(tasks);
    } catch (err) {
        next(err);
    }
});


// GET TASK BY ID
app.get('/tasks/:id', async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({
                message: 'Task not found'
            });
        }

        res.json(task);
    } catch (err) {
        next(err);
    }
});


// UPDATE TASK
app.put('/tasks/:id', async (req, res, next) => {
    try {
        const task = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!task) {
            return res.status(404).json({
                message: 'Task not found'
            });
        }

        res.json(task);
    } catch (err) {
        next(err);
    }
});


// DELETE TASK
app.delete('/tasks/:id', async (req, res, next) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);

        if (!task) {
            return res.status(404).json({
                message: 'Task not found'
            });
        }

        res.json({
            message: 'Task deleted successfully'
        });
    } catch (err) {
        next(err);
    }
});


// GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
        const errors = {};

        for (const field in err.errors) {
            errors[field] = err.errors[field].message;
        }

        return res.status(400).json({
            message: 'Validation failed',
            errors: errors
        });
    }

    if (err.name === 'CastError') {
        return res.status(400).json({
            message: 'Invalid ID format'
        });
    }

    console.error(err);

    res.status(500).json({
        message: 'Internal server error'
    });
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});