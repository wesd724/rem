import c from "../connect.js"
import dotenv from "dotenv";
dotenv.config();

export const deleteOneReply = ({ boardId, index }) => {
    c.then(async (connection) => {
        const db = connection.db(process.env.DB_NAME);
        const replyCollection = db.collection('reply');

        await replyCollection.updateOne(
            {
                boardId
            },
            {
                $pull: {
                    replies: {
                        index
                    }
                }
            }
        );
    })
}
