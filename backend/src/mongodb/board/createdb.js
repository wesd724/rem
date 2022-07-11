import connect from "../connect.js"
import dotenv from "dotenv";
dotenv.config();

export const create = data => {
    connect().then(async (connection) => {
        const db = connection.db(process.env.DB_NAME);
        const contentsCollection = db.collection('contents');

        await contentsCollection.insertOne({
            id: data.id,
            text: data.text,
            view: 0,
            good: 0,
            bad: 0
        });
    })
}
