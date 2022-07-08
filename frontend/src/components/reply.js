import React, { useCallback, useEffect, useState } from "react";
import { addReply, readReply } from "../lib/api";
import "./css/reply.css"

const Reply = ({ boardId }) => {
    const [replyList, setReplyList] = useState([]);

    const [reply, setReply] = useState("");

    useEffect(() => {
        readReply(boardId).then(res => setReplyList(res.data.replies));
    }, [boardId]);

    const change = useCallback(e => {
        setReply(e.target.value)
    }, []);

    const click = useCallback(async () => {
        await addReply({ boardId, reply });
        setReplyList([...replyList, { reply, nestedReplies: [] }])
        setReply("");
    }, [boardId, reply, replyList]);

    return (
        <div>
            <div className="reply">
                <textarea onChange={change} value={reply}></textarea>
                <p onClick={click}>reply</p>
                <div className="reply-list">
                    {replyList.map((value, index) =>
                        <div key={index}>
                            {value.reply}
                            <hr />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Reply;
