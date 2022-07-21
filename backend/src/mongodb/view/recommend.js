import c from "../connect.js"
import dotenv from "dotenv";
import { ObjectId } from "bson";
dotenv.config();

export const recommend = ({ _id, recommend }) => {
    c.then(async (connection) => {
        const db = connection.db(process.env.DB_NAME);
        const contentsCollection = db.collection('contents');

        await contentsCollection.updateOne(
            {
                _id: ObjectId(_id)
            },
            {
                $inc: {
                    [recommend]: 1
                }
            }
        )
    })
}
