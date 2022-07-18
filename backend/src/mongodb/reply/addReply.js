import connect from "../connect.js"
import dotenv from "dotenv";
import { ObjectId } from "bson";
dotenv.config();

export const addReply = ({ boardId, index, userId, reply }) => {
    connect().then(async (connection) => {
        const db = connection.db(process.env.DB_NAME);
        const replyCollection = db.collection('reply');

        await replyCollection.updateOne(
            {
                boardId
            },
            {
                $push: {
                    replies: {
                        index,
                        userId,
                        reply,
                        nestedReplies: []
                    }
                }
            }

        );
    })
}
