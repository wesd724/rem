import connect from "../connect.js"
import dotenv from "dotenv";
dotenv.config();

export const read = async (page, listLengthPerPage) => {
    return await connect().then(async (connection) => {
        const db = connection.db(process.env.DB_NAME);
        const contentsCollection = db.collection('contents');

        const length = await contentsCollection.countDocuments();
        const cursor = contentsCollection.find({})
            .skip((Number(page) - 1) * Number(listLengthPerPage))
            .limit(Number(listLengthPerPage));
        const result = await cursor.toArray();
        return { length, result };
    })
}
