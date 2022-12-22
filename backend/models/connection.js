 const mongoose = require("mongoose");

mongoose.set('strictQuery', true);
const connectionString = "mongodb+srv://Coralietur:cGgI9NNZcCFpsQTd@cluster0.jegajox.mongodb.net/TTC2";
mongoose
  .connect(connectionString, { connectTimeoutMS: 2000 })
  .then(() => console.log("Database connected"))
  .catch((error) => console.error(error));
  /*let gridFS = new MongoGridFS(connectionString.db, "invoices");
  gridFS.findById("59e085f272882d728e2fa4c2").then((item) => {
      console.log(item);
  }).catch((err) => {
      console.error(err);
  });*/