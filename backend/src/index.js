import express from "express";
import bodyParser from "body-parser";
import cors from 'cors';
import dotenv from 'dotenv';
import { create } from './mongodb/createdb.js';

dotenv.config();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("HELLO");
})

app.post("/create", (req, res) => {
    create(req.body);
    res.send("CREATE DATA");
})

app.listen(process.env.PORT, () => console.log("CONNECTED!"));