require("./db/mongoose");

const express = require("express");

// Models
const User = require("./models/user.js");
const Task = require("./models/task.js");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Creating new user
app.post("/users", (req, res) => {
  const user = new User(req.body);

  user
    .save()
    .then(() => res.status(201).send(user))
    .catch((err) => res.status(400).send(err));
});

// Getting all users
app.get("/users", (req, res) => {
  User.find()
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      res.status(500).send();
    });
});

// Getting single user by id
app.get("/users/:id", (req, res) => {
  const { id } = req.params;

  User.findById(id)
    .then((user) => {
      if (!user) {
        res.sendStatus(404);
      }
      res.send(user);
    })
    .catch((err) => res.sendStatus(500));
});

// Creating new task
app.post("/tasks", (req, res) => {
  const task = new Task(req.body);

  task
    .save()
    .then(() => res.status(201).send(task))
    .catch((err) => res.status(400).send(err));
});

// Getting all tasks
app.get("/tasks", (req, res) => {
  Task.find()
    .then((tasks) => res.send(tasks))
    .catch(() => res.sendStatus(500));
});

//Getting single task by id
app.get("/tasks/:id", (req, res) => {
  const { id } = req.params;
  Task.findById(id)
    .then((task) => {
      if (!task) {
        return res.sendStatus(404);
      }
      res.send(task);
    })
    .catch(() => res.sendStatus(500));
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
