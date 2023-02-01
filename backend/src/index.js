import express from "express";
import bodyParser from "body-parser";
import cors from 'cors';
import dotenv from 'dotenv';
import { create } from './mongodb/board/createdb.js';
import { read } from "./mongodb/board/readdb.js";
import { deleted } from "./mongodb/board/deletedb.js";
import { update } from "./mongodb/board/updatedb.js";
import replyRouter from "./routes/reply.js";
import infoRouter from "./routes/info.js";
import accountRounter from "./routes/account.js";

dotenv.config();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use("/reply", replyRouter);
app.use("/info", infoRouter);
app.use("/account", accountRounter);

app.get("/read/:pages", (req, res) => {
    read(req.params.pages, req.query.length, req.query.search)
        .then(response => res.send(response));
})

app.post("/create", (req, res) => {
    create(req.body);
    res.send('create');
})

app.delete("/delete", (req, res) => {
    deleted(req.body._id);
    res.send('delete');
})

app.put("/update", (req, res) => {
    update(req.body);
    res.send('update');
})

app.listen(process.env.PORT, () => console.log("CONNECTED!"));
