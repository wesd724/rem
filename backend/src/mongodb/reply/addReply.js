import connect from "../connect.js"
import dotenv from "dotenv";
import { ObjectId } from "bson";
dotenv.config();

export const addReply = data => {
    connect().then(async (connection) => {
        const db = await connection.db(process.env.DB_NAME);
        const replyCollection = db.collection('reply');

        await replyCollection.updateOne(
            {
                boardId: data.boardId
            },
            {
                $push: {
                    replies: {
                        reply: data.reply,
                        nestedReplies: []
                    }
                }
            }

        );
    })
}
