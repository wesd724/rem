import c from "../connect.js"
import dotenv from "dotenv";
import { ObjectId } from "bson";
dotenv.config();

export const readViewText = async (_id) => {
    return await c.then(async (connection) => {
        const db = connection.db(process.env.DB_NAME);
        const contentsCollection = db.collection('contents');

        const result = await contentsCollection.findOne(
            {
                _id:
                    ObjectId(_id)
            },
            {
                projection: {
                    _id: 0,
                    text: 1,
                    view: 1
                }
            }
        );
        return result;
    })
}
