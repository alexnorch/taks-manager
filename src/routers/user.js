const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { filterFields } = require("../utils/index");

// Creating new user
router.post("/users", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Getting all users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    res.sendStatus(500);
  }
});

// Getting single user by id
router.get("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) return res.sendStatus(404);

    res.send(user);
  } catch (error) {
    res.sendStatus(500);
  }
});

// Updating existing user
router.patch("/users/:id", async (req, res) => {
  const isValidOperation = filterFields(req.body, [
    "name",
    "age",
    "email",
    "password",
  ]);

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates" });
  }

  res.send("Hello world");

  try {
    const user = await User.findOneAndUpdate(req.params.id, req.body, {
      // "New" Return new user after calling that function
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.sendStatus(404);
    }

    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
