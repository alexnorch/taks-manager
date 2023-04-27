require("../src/db/mongoose");

const User = require("../src/models/user");

//
// Promise chaining
//

// User.findByIdAndUpdate("64413f25d497fc3fc3894b3e", { age: 21 })
//   .then((user) => {
//     console.log(user);
//     return User.countDocuments({ age: 21 });
//   })
//   .then((res) => console.log(res))
//   .catch((err) => console.log(err));

//
// Recreating this function with async/await
//

const updateAgeAndCount = async (id, age) => {
  const updatedUser = await User.findByIdAndUpdate(id, { age });
  return await User.countDocuments({ age });
};

updateAgeAndCount("64413f25d497fc3fc3894b3e", 97)
  .then((res) => console.log(res))
  .catch((err) => console.log(err));
