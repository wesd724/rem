import c from "../connect.js"
import dotenv from "dotenv";
dotenv.config();

export const read = async (page, listLengthPerPage, reg) => {
    return await c.then(async (connection) => {
        const db = connection.db(process.env.DB_NAME);
        const contentsCollection = db.collection('contents');

        const regex = new RegExp(`.*${reg}`)

        const findQuery = {title: {
            $regex: regex
        }}

        const length = await contentsCollection.countDocuments(findQuery);
        const cursor = contentsCollection.find(findQuery)
            .sort({ _id: -1 })
            .skip((Number(page) - 1) * Number(listLengthPerPage))
            .limit(Number(listLengthPerPage));
        const result = await cursor.toArray();
        return { length, result };
    })
}
