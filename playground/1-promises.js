// Callbacks

const dummyData = [
  {
    name: "Alex",
    age: 25,
  },
  {
    name: "Anastasia",
    age: 22,
  },
];

const doWorkCallBack = (callback) => {
  setTimeout(() => {
    callback(null, dummyData);
  }, 2000);
};

const checkCallStack = () => {
  console.log("Start function");

  doWorkCallBack((err, res) => {
    if (err) {
      return console.log(err);
    }

    console.log(res);
  });

  console.log("End function");
};

// checkCallStack();

// Promises

const doWorkPromises = new Promise((resolve, reject) => {
  if (!true) {
    reject("Something went wrong");
  }

  setTimeout(() => {
    resolve(dummyData);
  }, 2000);
});

// doWorkPromises
//   .then((data) => console.log(data))
//   .catch((err) => console.log(err))
//   .finally(() => console.log("Promise ended"));

const add = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(a + b);
    }, 2000);
  });
};

// How we can recreate this with promise chaining?
// add(5, 10)
//   .then((sum) => {
//     console.log(sum);
//     add(sum, 10)
//       .then((res) => console.log(res))
//       .catch((err) => console.log(err));
//   })
//   .catch((err) => console.log(err));

// Here is the answer

console.log("start");

add(10, 5)
  .then((sum1) => {
    console.log(sum1);
    return add(sum1, 10);
  })
  .then((sum2) => {
    console.log(sum2);
    return add(sum2, 15);
  })
  .then((sum3) => {
    console.log(sum3);
    return add(sum3, 15);
  })
  .then((res) => console.log(res))
  .catch((err) => console.log(err));

console.log("end");
