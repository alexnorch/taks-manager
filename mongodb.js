const { MongoClient, ObjectId } = require("mongodb");

const localUrl = "mongodb://localhost:27017/";
const dbName = "task-manager";

const client = new MongoClient(localUrl);

async function main() {
  await client.connect();

  const db = client.db(dbName);
  const userCollection = db.collection("users");
  const taskCollection = db.collection("tasks");

  // Return object from db
  const singleUser = await userCollection.findOne({
    _id: new ObjectId("64413f25d497fc3fc3894b3e"),
  });

  // Return cursor
  const tasks = await taskCollection.find({ completed: false });

  // Update many objects
  // await taskCollection.updateMany(
  //   { completed: false },
  //   { $set: { completed: true } }
  // );

  // Update single object:
  // await userCollection.updateOne(
  //   { name: "Alexander" },
  //   { $set: { name: "Olehandro" } }
  // );
}

// Without await/async it would looks like this:
// const taskPromise = taskCollection.findOne({ name: "Alexander" });
// taskPromise.then((data) => console.log(data)).catch((err) => console.log(err));

main()
  .catch(console.dir)
  .finally(() => client.close());
