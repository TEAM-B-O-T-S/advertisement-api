import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import cors from "cors";
import adRouter from "./routes/product_route.js";

// MAKE DATABASE CONNECTION
await mongoose.connect(process.env.MONGO_URI);

// CREATE AN EXPRESS APP
const app = express();

// USE GLOBAL MIDDLEWARES
app.use(express.json());
app.use(cors());
app.use(adRouter);

// LISTEN FOR INCOMING REQUESTS
const port = process.env.PORT || 6000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

//for the env file
// MONGO_URI = "mongodb+srv://advert-api:bjFS0TeHLsET7Qko@cluster0.njhep.mongodb.net/advert_db"

//  SAVEFILESORG_API_KEY ="1596|vAMprb3cS2NsHlL4zzbQyE1EOZZUYUOdJGKzAzco"

//  PORT = 6000

// #  1596|vAMprb3cS2NsHlL4zzbQyE1EOZZUYUOdJGKzAzco

// # bjFS0TeHLsET7Qko
