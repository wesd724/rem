import connect from "../connect.js"
import dotenv from "dotenv";
import { ObjectId } from "bson";
dotenv.config();

export const addViews = id => {
    connect().then(async (connection) => {
        const db = connection.db(process.env.DB_NAME);
        const contentsCollection = db.collection('contents');

        await contentsCollection.updateOne(
            {
                _id: ObjectId(id)
            },
            {
                $inc: {
                    view: 1
                }
            }
        )
    })
}
