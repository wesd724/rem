import connect from "./connect.js"
import dotenv from "dotenv";
dotenv.config();

export const create = (data) => {
    connect().then(async (connection) => {
        const db = await connection.db(process.env.DB_NAME);
        const contentsCollection = db.collection('contents');

        const contents = { id: data.id, text: data.text };
        const result = await contentsCollection.insertOne(contents);
    })
}

