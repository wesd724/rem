import React, { useCallback, useEffect, useState } from "react";
import { addReply, deleteOneReply, readReply } from "../lib/api";
import "./css/reply.css";
import { MdDeleteForever } from 'react-icons/md';

const Reply = ({ boardId }) => {
    const userId = sessionStorage.getItem("id");
    const [replyList, setReplyList] = useState([]);

    const [reply, setReply] = useState("");

    const [replyIndex, setReplyIndex] = useState(0);

    useEffect(() => {
        readReply(boardId).then(res => {
            setReplyList(res.data.replies);
            if (res.data.replies.length === 0) setReplyIndex(1);
            else setReplyIndex(res.data.replies.at(-1).index + 1);
        });
    }, [boardId]);

    const change = useCallback(e => {
        setReply(e.target.value)
    }, []);

    const click = useCallback(async () => {
        if (reply === "") {
            alert("please write reply");
            return;
        }
        await addReply({ boardId, index: replyIndex, userId, reply });
        setReplyList(replyList => [...replyList, {
            index: replyIndex, userId, reply, nestedReplies: []
        }])
        setReplyIndex(replyIndex => replyIndex + 1);
        setReply("");
    }, [boardId, reply, replyIndex, userId]);

    const deleteOne = async (data) => {
        await deleteOneReply(data);
        setReplyList(replyList => replyList.filter(value => value.index !== data.index));
    }

    return (
        <div className="reply">
            <textarea onChange={change} value={reply}></textarea>
            <p className="add-reply" onClick={click}>add</p>
            <div className="reply-list">
                {replyList.map(value =>
                    <div key={value.index}>
                        <div className="reply">
                            {value.reply}</div>
                        <div className="userId">
                            {value.userId === "--" ? "NONE" : value.userId}
                        </div>
                        {
                            value.userId === userId ?
                                <div className="remove-Icon">
                                    <MdDeleteForever onClick={() => deleteOne({ boardId, index: value.index })}>delete</MdDeleteForever>
                                </div> : null
                        }
                        <hr className="reply-boundary" />
                    </div>
                )}
            </div>
        </div>
    )
}

export default React.memo(Reply);
