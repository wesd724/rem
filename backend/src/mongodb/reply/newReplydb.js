import connect from "../connect.js"
import dotenv from "dotenv";
dotenv.config();

export const newReply = boardId => {
    connect().then(async (connection) => {
        const db = connection.db(process.env.DB_NAME);
        const replyCollection = db.collection('reply');

        const result = await replyCollection.find({ boardId }).toArray();
        if(result.length === 0) await replyCollection.insertOne({ boardId, replies: [] });
        else return;
    })
}
/*
[
    {
        _id: (reply collection document unique _id)
        boardId: data._id(each text unique _id)
        replies: [
            {
                "index": 1,
                "id": user login id,
                "reply": "asdasd",
                nestedReplies: [
                    "first",
                    "second",
                ]

            },
            {
                "index": 2,
                "id": user login id,
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
                "index": 1,
                "id": user login id,
                "reply": "asdasd",
                nestedReplies: [
                    "first",
                    "second",
                ]

            },
            {
                "index": 2,
                "id": user login id,
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
