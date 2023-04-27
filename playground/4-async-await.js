//
// Notes
//

// By default functions in JavaScript returns undefined, until we specify in body function return statement
// If me mark a function as an async this function returns Promise { undefined }

const sumNumbers = (a, b) => {
  return new Promise((resolve, rejected) => {
    setTimeout(() => {
      if (a < 0 || b < 0) rejected("Only positive numbers");
      resolve(a + b);
    }, 2000);
  });
};

const doWork = async () => {
  const sum = await sumNumbers(1, 99);
  const sum2 = await sumNumbers(sum, 10);
  const sum3 = await sumNumbers(sum2, -50);
  return sum3;
};

doWork()
  .then((res) => console.log(res))
  .catch((err) => console.log("Error:", err));
