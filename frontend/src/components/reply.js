import React, { useCallback, useEffect, useState } from "react";
import { addReply, deleteOneReply, readReply } from "../lib/api";
import "./css/reply.css";
import { MdDeleteForever } from 'react-icons/md';

const Reply = ({ boardId }) => {
    const [replyList, setReplyList] = useState([]);

    const [reply, setReply] = useState("");

    const [replyIndex, setReplyIndex] = useState(1);

    useEffect(() => {
        readReply(boardId).then(res => setReplyList(res.data.replies));
    }, [boardId]);

    const change = useCallback(e => {
        setReply(e.target.value)
    }, []);

    const click = useCallback(async () => {
        if (reply === "") {
            alert("please write reply");
            return;
        }
        await addReply({ index: replyIndex, boardId, reply });
        setReplyList(replyList => [...replyList, {
            index: replyIndex, reply, nestedReplies: []
        }])
        setReplyIndex(replyIndex => replyIndex + 1);
        setReply("");
    }, [boardId, reply, replyIndex]);

    const deleteOne = async (data) => {
        await deleteOneReply(data);
        setReplyList(replyList => replyList.filter(value => value.index !== data.index));
    }

    return (
        <div>
            <div className="reply">
                <textarea onChange={change} value={reply}></textarea>
                <p onClick={click}>reply</p>
                <div className="reply-list">
                    {replyList.map(value =>
                        <div key={value.index}>
                            {value.reply}
                            <div className="remove-Icon">
                                <MdDeleteForever onClick={() => deleteOne({ boardId, index: value.index })}>delete</MdDeleteForever>
                            </div>
                            <hr />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Reply;
