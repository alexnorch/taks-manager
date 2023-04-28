const bcrypt = require("bcryptjs");
const express = require("express");

require("./db/mongoose");

// Routes
const userRouter = require("../src/routers/user");
const taskRouter = require("../src/routers/task");

const app = express();
const port = process.env.PORT || 3000;

//
// This is how express middlewares work
//

// app.use((req, res, next) => {
//   if (req.method === "GET") {
//     res.send("GET request are disabled");
//   } else {
//     next();
//   }
// });

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
