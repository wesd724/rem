import c from "../connect.js"
import dotenv from "dotenv";
import { ObjectId } from "bson";
dotenv.config();

export const readRecommend = async (_id) => {
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
                    good: 1,
                    bad: 1
                }
            }
        );
        return result;
    })
}
