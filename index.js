import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import cors from "cors";

// MAKE DATABASE CONNECTION
await mongoose.connect(process.env.MONGO_URI);

// CREATE AN EXPRESS APP
const app = express();

// USE GLOBAL MIDDLEWARES 
app.use(express.json());
app.use(cors());

// LISTEN FOR INCOMING REQUESTS
const port = process.env.PORT || 6000
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})