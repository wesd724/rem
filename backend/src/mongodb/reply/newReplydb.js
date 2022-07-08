import connect from "../connect.js"
import dotenv from "dotenv";
dotenv.config();

export const newReply = boardId => {
    connect().then(async (connection) => {
        const db = await connection.db(process.env.DB_NAME);
        const replyCollection = db.collection('reply');

        await replyCollection.insertOne({ boardId, replies: [] });
    })
}
/*
[
    {
        _id: (reply collection document unique _id)
        boardId: data._id(each text unique _id)
        replies: [
            {
                "reply": "asdasd",
                nestedReplies: [
                    "first",
                    "second",
                ]

            },
            {
                "reply": "two",
                nestedReplies: [
                    "one",
                    "two",
                ]

            },
            ...
        ]
    },
    {
        _id: (reply collection unique _id)
        boardId: data._id(each text unique _id)
        replies: [
            {
                "reply": "asdasd",
                nestedReplies: [
                    "first",
                    "second",
                ]

            },
            {
                "reply": "two",
                nestedReplies: [
                    "one",
                    "two",
                ]

            },
            ...
        ]
    }
]
*/
