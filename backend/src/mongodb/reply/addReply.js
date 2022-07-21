import c from "../connect.js"
import dotenv from "dotenv";
dotenv.config();

export const addReply = ({ boardId, index, userId, reply }) => {
    c.then(async (connection) => {
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
