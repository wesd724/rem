import c from "../connect.js"
import dotenv from "dotenv";
dotenv.config();

export const read = async (page, listLengthPerPage) => {
    return await c.then(async (connection) => {
        const db = connection.db(process.env.DB_NAME);
        const contentsCollection = db.collection('contents');

        const length = await contentsCollection.countDocuments();
        const cursor = contentsCollection.find({})
            .sort({ _id: -1 })
            .skip((Number(page) - 1) * Number(listLengthPerPage))
            .limit(Number(listLengthPerPage));
        const result = await cursor.toArray();
        return { length, result };
    })
}
