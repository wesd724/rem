import express from "express";
import bodyParser from "body-parser";
import cors from 'cors';
import dotenv from 'dotenv';
import { create } from './mongodb/createdb.js';
import { read } from "./mongodb/readdb.js";

dotenv.config();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send(`Hi`);
})

app.post("/create", (req, res) => {
    create(req.body);
    res.send(`CREATE!`);
})

app.post("/read", (req, res) => {
    read().then(response => res.send(response))
})

app.listen(process.env.PORT, () => console.log("CONNECTED!"));