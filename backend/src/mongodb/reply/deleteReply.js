import connect from "../connect.js"
import dotenv from "dotenv";
dotenv.config();

export const deleteReply = boardId => {
    connect().then(async (connection) => {
        const db = await connection.db(process.env.DB_NAME);
        const replyCollection = db.collection('reply');

        await replyCollection.deleteOne({ boardId });
    })
}
