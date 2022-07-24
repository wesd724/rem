import express from 'express';
import { addReply } from '../mongodb/reply/addReply.js';
import { deleteOneReply } from '../mongodb/reply/deleteOneReply.js';
import { deleteReply } from '../mongodb/reply/deleteReplydb.js';
import { newReply } from '../mongodb/reply/newReplydb.js';
import { readReply } from '../mongodb/reply/readReplydb.js';
import { updateOneReply } from '../mongodb/reply/updateOneReply.js';

const replyRouter = express.Router();

replyRouter.get("/", (req, res) => {
    readReply(req.query.boardId).then(response => res.send(response));
})

replyRouter.post("/new", (req, res) => {
    newReply(req.body.boardId);
    res.send('create new reply');
})

replyRouter.post("/add", (req, res) => {
    addReply(req.body);
    res.send('add reply');
})

replyRouter.delete("/delete", (req, res) => {
    deleteReply(req.body.boardId);
    res.send('delete reply');
})

replyRouter.delete("/deleteOne", (req, res) => {
    deleteOneReply(req.body);
    res.send('delete reply');
})

replyRouter.put("/updateOne", (req, res) => {
    updateOneReply(req.body);
    res.send('update reply');
})

export default replyRouter;
