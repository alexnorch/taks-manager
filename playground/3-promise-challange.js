//
// Goal: Mess around with promise chaining
//
// 1. Create promise-chaining-2.js
// 2. Load in mongoose and task model
// 3. Remove a given task by id
// 4. Get and print the total number of incomplete tasks
// 5. Test your work

require("../src/db/mongoose");
const Task = require("../src/models/task");

Task.findById("6444e867d38934bbfd9375d5")
  .then((task) => {
    if (!task) {
      throw new Error("There is no task with such ID");
    }

    return Task.findByIdAndRemove("6444e867d38934bbfd9375d5");
  })
  .then(() => {
    return Task.countDocuments({ completed: false });
  })
  .then((res) => console.log(res))
  .catch((err) => console.log(err));

//
// Recreating this function with async/await
//

const deleteTaskAndCount = async (id) => {
  try {
    const task = await Task.findById(id);
    if (!task) {
      throw new Error(
        "There is no task with that ID. Please, try again with the correct ID"
      );
    }
    await Task.findByIdAndDelete(task._id);
    return await Task.countDocuments({ completed: false });
  } catch (error) {
    console.log(error);
  }
};

deleteTaskAndCount("644634077fadff70a33751e1")
  .then((res) => console.log(res))
  .catch((err) => console.log(err));
