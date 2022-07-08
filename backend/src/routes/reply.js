import express from 'express';
import { addReply } from '../mongodb/reply/addReply.js';
import { deleteReply } from '../mongodb/reply/deleteReply.js';
import { newReply } from '../mongodb/reply/newReplydb.js';
import { readReply } from '../mongodb/reply/readReplydb.js';

const router = express.Router();

router.get("/", (req, res) => {
    readReply(req.query.boardId).then(response => res.send(response));
})

router.post("/new", (req, res) => {
    newReply(req.body._id);
    res.send('create new reply');
})

router.post("/add", (req, res) => {
    addReply(req.body);
    res.send('add reply');
})

router.delete("/delete", (req, res) => {
    deleteReply(req.body.boardId);
    res.send('delete reply');
})

router.put("/", (req, res) => {
    res.send('update reply');
})

export default router;
