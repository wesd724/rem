import express from 'express';
import { addViews } from '../mongodb/view/addViews.js';
import { readRecommend } from '../mongodb/view/readRecommend.js';
import { recommend } from '../mongodb/view/recommend.js';

const viewRouter = express.Router();

viewRouter.post("/views", (req, res) => {
    addViews(req.body._id);
    res.send("add views");
})

viewRouter.put("/recommend", (req, res) => {
    recommend(req.body);
    res.send("recommend");
})

viewRouter.post("/readrecommend", (req, res) => {
    readRecommend(req.body._id).then(response => res.send(response));
})

export default viewRouter;
