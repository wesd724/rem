import connect from "../connect.js"
import dotenv from "dotenv";
import { ObjectId } from "bson";
dotenv.config();

export const deleted = id => {
    connect().then(async (connection) => {
        const db = await connection.db(process.env.DB_NAME);
        const contentsCollection = db.collection('contents');

        await contentsCollection.deleteOne({_id: ObjectId(id)});
    })
}
