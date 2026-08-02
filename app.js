const express = require('express');
const app = express();
const PORT = 5001;

// Middleware to parse JSON requests
app.use(express.json());

// In-memory database
let tasks = [
    {
        id: 1,
        title: "Learn Express",
        completed: false
    }
];

// Logging Middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url} - ${new
        Date().toISOString()}`);
    next();
});

// Content-Type Middleware
app.use((req, res, next) => {

    if (
        (req.method === "POST" || req.method === "PUT") &&
        !req.is("application/json")
    ) {
        return res.status(400).json({
            message: "Content-Type must be application/json"
        });
    }

    next();
});

// Route Middleware
function validateId(req, res, next) {
    const id = Number(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({
            message: "Invalid Task ID"
        });
    }
    next();
}

//Get All Tasks And Create Task
app.route('/tasks')
    .get((req, res) => {
        res.status(200).json(tasks);
    })
    .post((req, res) => {
        const { title, completed } = req.body;

        const newTask = {

            id: tasks.length + 1,
            title,
            completed: completed || false
        };
        tasks.push(newTask);
        res.status(201).json({
            message: "Task Created",
            task: newTask
        });
    });

//Update Task And delete Task
app.route('/tasks/:id')
    .put(validateId, (req, res) => {
        const id = Number(req.params.id);
        const { title, completed } = req.body;

        const taskIndex = tasks.findIndex(t => t.id === id);
        if (taskIndex === -1) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        tasks[taskIndex] = {
            id,
            title: title || tasks[taskIndex].title,
            completed: completed !== undefined ? completed : tasks[taskIndex].completed
        };

        res.status(200).json({
            message: "Task Updated",
            task: tasks[taskIndex]
        });
    })
    .delete(validateId, (req, res) => {

        const id = Number(req.params.id);
        const index = tasks.findIndex(t => t.id === id);
        if (index === -1) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        tasks.splice(index, 1);

        res.status(200).json({
            message: "Task Deleted"
        });

    });

// 404 Middleware
app.use((req, res, next) => {

    res.status(404).json({
        error: "Route Not Found"
    });
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong' });
});

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));