const express = require("express");
const multer = require("multer");
const sharp = require("sharp");

const User = require("../models/user");
const { filterFields } = require("../utils/index");
const auth = require("../middleware/auth");

const router = express.Router();

const upload = multer({
  limits: {
    fileSize: 1048576,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/.\.(jpg|png)$/)) {
      cb(new Error("Please upload photo only with jpr or png extension"));
    }

    cb(undefined, true);
  },
});

// Creating new user
router.post("/users", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();

    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token !== req.token
    );

    await req.user.save();
    res.send();
  } catch (error) {
    res.sendStatus(500);
  }
});

router.post("/users/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();

    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Getting user
router.get("/users/me", auth, async (req, res) => {
  res.send(req.user);
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
router.patch("/users/me", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const isValidOperation = filterFields(req.body, [
    "name",
    "age",
    "email",
    "password",
  ]);

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates" });
  }

  try {
    updates.forEach((key) => {
      req.user[key] = req.body[key];
    });

    await req.user.save();
    res.send(req.user);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/users/login", async (req, res) => {
  try {
    console.log(req.body);
    // findByCredentials our custom function we create in schema
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({
      user,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

router.delete("/users/me", auth, async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ _id: req.user._id });
    res.send(user);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.post(
  "/users/me/avatar",
  auth,
  upload.single("avatar"),
  async (req, res) => {
    const buffer = await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .toBuffer();
    req.user.avatar = buffer;
    await req.user.save();
    res.send("Successfully uploaded");
  },
  (err, req, res, next) => {
    res.status(400).send({ errorMessage: err.message });
  }
);

router.delete("/users/me/avatar", auth, async (req, res) => {
  req.user.avatar = undefined;
  await req.user.save();
  res.send();
});

router.get("/users/:id/avatar", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user || !user.avatar) {
      throw new Error("Cannot find the user");
    }

    res.set("Content-Type", "images/jpg");
    res.send(user.avatar);
  } catch (error) {
    res.sendStatus(404);
  }
});

module.exports = router;
