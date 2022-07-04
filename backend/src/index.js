import express from "express";
import bodyParser from "body-parser";
import cors from 'cors';
import dotenv from 'dotenv';
import { create } from './mongodb/createdb.js';

dotenv.config();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get("/a", (req, res) => {
    res.send("HELLO");
})

app.listen(process.env.PORT, () => console.log("CONNECTED!"));