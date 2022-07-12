import connect from "../connect.js"
import dotenv from "dotenv";
dotenv.config();

export const read = async (pages) => {
    return await connect().then(async (connection) => {
        const db = connection.db(process.env.DB_NAME);
        const contentsCollection = db.collection('contents');

        const length = await contentsCollection.countDocuments();
        const cursor = contentsCollection.find({})
            .skip((Number(pages) - 1) * 7).limit(7);
        const result = await cursor.toArray();
        return { length, result };
    })
}
