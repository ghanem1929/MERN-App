const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// access to env variables
dotenv.config();
const app = express();

//init middleware
app.use(express.json());

connectDB();

//define routes

app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/contacts", require("./routes/contacts"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server start at ${PORT}`));
