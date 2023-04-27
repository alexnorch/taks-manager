const express = require("express");
const Task = require("../models/user");
const { filterFields } = require("../utils/index");
const router = express.Router();

// Creating new task
router.post("/tasks", async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send(err);
  }
});

// Getting all tasks
router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.send(tasks);
  } catch (error) {
    res.sendStatus(500);
  }
});

//Getting single task by id
router.get("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);

    if (!task) return res.sendStatus(404);

    res.send(task);
  } catch (error) {
    res.sendStatus(500);
  }
});

router.patch("/tasks/:id", async (req, res) => {
  const isValidOperation = filterFields(req.body, ["description", "completed"]);

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates" });
  }

  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!task) return res.sendStatus(404);

    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
