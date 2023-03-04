const express = require("express");

const { connection } = require("./configs/db");
const { userRouter } = require("./routes/User.routes");
//const { authenticate } = require("./middlewares/authenticate.middleware");
const cors = require("cors");

require("dotenv").config();

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (req, res) => {
  res.send("Sandesh Jadhav");
});
app.use("/users", userRouter);
//app.use(authenticate);

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("connected to DB");
  } catch (err) {
    console.log(err);
  }

  console.log(`listening at : ${process.env.port}`);
});
