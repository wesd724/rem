import express from "express";
import bodyParser from "body-parser";
import cors from 'cors';
import dotenv from 'dotenv';
import { create } from './mongodb/createdb.js';
import { read } from "./mongodb/readdb.js";
import { deleted } from "./mongodb/deletedb.js";

dotenv.config();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send(`Hi`);
})

app.get("/read", (req, res) => {
    read().then(response => res.send(response))
})

app.post("/create", (req, res) => {
    create(req.body);
    res.send(`create`);
})

app.delete("/delete", (req, res) => {
    deleted(req.body._id);
    res.send(`delete`);
})

app.listen(process.env.PORT, () => console.log("CONNECTED!"));