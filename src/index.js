const express = require("express");
const env = require("dotenv");
const mongoose = require("mongoose");

const app = express();

//environment variables
env.config();

const port = process.env.PORT;
const mongoPass = process.env.MONGO_PASSWORD;
const mongoAdmin = process.env.MONGO_ADMIN;
const database = process.env.MONGO_DATABASE;

//routes

const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin/auth");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");

// middle-ware

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/api", authRoutes);
app.use("/api", adminRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);

// Server
app.listen(port, () => {
  console.log(`server listening on port ${port}`);
  mongoose
    .connect(
      `mongodb+srv://${mongoAdmin}:${mongoPass}@cluster0.rxznn.mongodb.net/${database}?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      }
    )
    .then(() => {
      console.log("database connected");
    });
});
