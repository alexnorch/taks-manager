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

doWorkPromises
  .then((data) => console.log(data))
  .catch((err) => console.log(err))
  .finally(() => console.log("Promise ended"));
