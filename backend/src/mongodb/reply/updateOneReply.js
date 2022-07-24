import c from "../connect.js"
import dotenv from "dotenv";
import { ObjectId } from "bson";
dotenv.config();

export const updateOneReply = ({ boardId, index, reply }) => {
    c.then(async (connection) => {
        const db = connection.db(process.env.DB_NAME);
        const replyCollection = db.collection('reply');

        await replyCollection.updateOne(
            {
                boardId,
                replies: {
                    $elemMatch: {
                        index
                    }
                }
            },
            {
                $set: {
                    "replies.$.reply": reply
                }
            }
        )
    })
}
/*
db.reply.updateOne(
    {
        boardId: "boardId",
        replies: {
            $elemMatch: {
                index: number
            }
        }
    },
    {
        $set: {
            "replies.$.reply": "text1"
        }
    }
)
===
db.reply.updateOne(
    {
        boardId: "boardId",
        "replies.index": number
    },
    {
        $set: {
            "replies.$.reply": "text2"
        }
    }
)
*/
