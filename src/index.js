require("./db/mongoose");

const express = require("express");

// Routes
const userRouter = require("../src/routers/user");
const taskRouter = require("../src/routers/task");

// Models
const User = require("./models/user.js");
const Task = require("./models/task.js");

// Utils
const { filterFields } = require("./utils/index");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
