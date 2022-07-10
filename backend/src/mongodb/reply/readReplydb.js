import connect from "../connect.js"
import dotenv from "dotenv";
dotenv.config();

export const readReply = async(boardId) => {
    return await connect().then(async (connection) => {
        const db = connection.db(process.env.DB_NAME);
        const replyCollection = db.collection('reply');

        const result = await replyCollection.findOne({ boardId });
        return result;
    })
}
