import connect from "../connect.js"
import dotenv from "dotenv";
import { ObjectId } from "bson";
dotenv.config();

export const update = data => {
    connect().then(async (connection) => {
        const db = connection.db(process.env.DB_NAME);
        const contentsCollection = db.collection('contents');

        const { _id, text } = data;
        await contentsCollection.updateOne(
            { _id: ObjectId(_id) }, { $set: { text } }
        );
    })
}
