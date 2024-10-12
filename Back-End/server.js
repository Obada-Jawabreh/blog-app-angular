require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
const connectDB = require("./config/db");
 
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:4200",
    credentials: true,
  })
);

connectDB();
// ---------------------------routes---------------------------------
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const commentRoutes = require("./routes/commentRoutes");

app.use("/api/user", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comment", commentRoutes);

// ---------------------------listen---------------------------------

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
