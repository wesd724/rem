import connect from "../connect.js"
import dotenv from "dotenv";
dotenv.config();

export const read = async () => {
    return await connect().then(async (connection) => {
        const db = await connection.db(process.env.DB_NAME);
        const contentsCollection = db.collection('contents');

        const cursor = contentsCollection.find({});
        const result = await cursor.toArray();
        return result;
    })
}
