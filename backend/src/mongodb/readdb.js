import connect from "./connect.js"
import dotenv from "dotenv";
dotenv.config();

export const read = (data) => {
    connect().then(async (connection) => {
        const db = await connection.db(process.env.DB_NAME);
        const contentsCollection = db.collection('contents');

        let cursor = contentsCollection.find({});
        const result = await cursor.toArray();
        return result;
    })
}