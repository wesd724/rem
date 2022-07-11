import express from "express";
import bodyParser from "body-parser";
import cors from 'cors';
import dotenv from 'dotenv';
import { create } from './mongodb/board/createdb.js';
import { read } from "./mongodb/board/readdb.js";
import { deleted } from "./mongodb/board/deletedb.js";
import { update } from "./mongodb/board/updatedb.js";
import replyRouter from "./routes/reply.js";
import viewRouter from "./routes/view.js";

dotenv.config();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use("/reply", replyRouter);
app.use("/view", viewRouter);

app.get("/", (req, res) => {
    read().then(response => res.send(response))
})

app.post("/", (req, res) => {
    create(req.body);
    res.send('create');
})

app.delete("/", (req, res) => {
    deleted(req.body._id);
    res.send('delete');
})

app.put("/", (req, res) => {
    update(req.body);
    res.send('update');
})

app.listen(process.env.PORT, () => console.log("CONNECTED!"));
