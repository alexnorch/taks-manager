const express = require("express");
const Task = require("../models/task");
const auth = require("../middleware/auth");

const { filterFields } = require("../utils/index");
const router = express.Router();

// Creating new task
router.post("/tasks", auth, async (req, res) => {
  try {
    const task = new Task({
      ...req.body,
      author: req.user._id,
    });
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send(err);
  }
});

// Getting all tasks
router.get("/tasks", auth, async (req, res) => {
  try {
    // Virtual fields doesn't show in the output
    // const tasks = await Task.find({ author: req.user._id });
    const user = await req.user.populate("tasks");
    res.send(user.tasks);
  } catch (error) {
    res.sendStatus(500);
  }
});

//Getting single task by id
router.get("/tasks/:id", auth, async (req, res) => {
  try {
    const _id = req.params.id;
    const task = await Task.findOne({ _id, author: req.user._id });

    if (!task) {
      return res.sendStatus(404);
    }

    res.send(task);
  } catch (error) {
    res.sendStatus(500);
  }
});

router.patch("/tasks/:id", auth, async (req, res) => {
  const bodyArray = Object.keys(req.body);
  const isValidOperation = filterFields(req.body, ["description", "completed"]);

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates" });
  }

  try {
    const task = await Task.findOne({
      _id: req.params.id,
      author: req.user._id,
    });

    if (!task) {
      return res.sendStatus(404);
    }

    bodyArray.forEach((key) => {
      task[key] = req.body[key];
    });

    await task.save();
    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/tasks/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      author: req.user._id,
    });

    if (!task) {
      return res.sendStatus(404);
    }

    res.send(task);
  } catch (error) {
    res.sendStatus(error);
  }
});

module.exports = router;
