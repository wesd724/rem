import React, { useCallback, useEffect, useState } from "react";
import { addReply, deleteOneReply, newReply, readReply, updateOneReply } from "../lib/api";
import "./css/reply.css";
import { MdDeleteForever } from 'react-icons/md';
import { AiTwotoneEdit } from 'react-icons/ai';
import { Button, TextField } from "@mui/material";

const Reply = ({ boardId }) => {
    const userId = sessionStorage.getItem("id");
    const [replyUpdateInput, setReplyUpdateInput] = useState(false);
    const [replyList, setReplyList] = useState([{
        index: 0,
        userId: "",
        reply: "",
        nestedReplies: []
    }]);

    const [reply, setReply] = useState("");
    const [replyIndex, setReplyIndex] = useState(0);

    const [oneReply, setOneReply] = useState("");
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const boardRely = async () => {
            await newReply({ boardId });
            readReply(boardId).then(res => {
                setReplyList(res.data.replies);
                if (res.data.replies.length === 0) setReplyIndex(1);
                else setReplyIndex(res.data.replies.at(-1).index + 1);
            });
        }
        boardRely();
    }, [boardId]);

    const changeReplyText = useCallback(e => {
        setReply(e.target.value)
    }, []);

    const changeOneReply = useCallback(e => {
        setOneReply(e.target.value);
    }, []);

    const click = useCallback(async () => {
        if (reply === "") {
            alert("please fill in the reply");
            return;
        }
        await addReply({ boardId, index: replyIndex, userId, reply });
        setReplyList(replyList => [...replyList, {
            index: replyIndex, userId, reply, nestedReplies: []
        }])
        setReplyIndex(replyIndex => replyIndex + 1);
        setReply("");
    }, [boardId, reply, replyIndex, userId]);

    const updateOne = useCallback(async (e, data) => {
        setReplyUpdateInput(!replyUpdateInput);
        if (e.currentTarget.style.color !== "skyblue") {
            e.currentTarget.style.color = "skyblue";
            setOneReply(data.reply);
            setIndex(data.index);
        } else {
            e.currentTarget.style.color = "#2f31bb";
            await updateOneReply({ ...data, index, reply: oneReply });
            setReplyList(replyList => replyList.filter(value => {
                if (value.index === index) return value.reply = oneReply;
                return value;
            }))
        }

        // setReplyUpdateInput(!replyUpdateInput);
        // if (replyUpdateInput) {
        //     await updateOneReply({ ...data, reply: oneReply });
        //     setReplyList(replyList => replyList.filter(value => {
        //         if(value.index === data.index) return value.reply = oneReply;
        //         return value;
        //     }))
        // }
    }, [replyUpdateInput, oneReply, index]);

    const deleteOne = useCallback(async (data) => {
        await deleteOneReply(data);
        setReplyList(replyList => replyList.filter(value => value.index !== data.index));
    }, []);

    return (
        <div className="reply">
            <TextField onChange={changeReplyText} value={reply} className="text-input" label="reply" variant="standard" />
            <Button className="add-reply" size="small" onClick={click} variant="outlined">WRITE</Button>
            <div className="reply-list">
                {replyList.map(value =>
                    <div key={value.index}>
                        <div className="reply">
                            {
                                value.index === index && replyUpdateInput ?
                                    <textarea value={oneReply} onChange={changeOneReply} /> :
                                    <div>{value.reply}</div>
                            }
                        </div>
                        <div className="userId">
                            {value.userId === "--" ? "NONE" : value.userId}
                        </div>
                        {
                            value.userId === userId ?
                                <div>
                                    <div className="update-icon" onClick={e => updateOne(e, { boardId, index: value.index, reply: value.reply })}>
                                        <AiTwotoneEdit />
                                    </div>
                                    <MdDeleteForever className="remove-icon" onClick={() => deleteOne({ boardId, index: value.index })} />
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
