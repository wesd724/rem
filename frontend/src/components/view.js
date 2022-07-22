import { Button } from "@mui/material";
import React from "react";
import { MdArrowBack, MdDeleteOutline, MdEdit } from "react-icons/md";
import { deleteData, deleteReply, updateData } from "../lib/api";
import "./css/view.css"
import Reply from "./reply";

const update = async (e, id) => {
    const currentElement = e.target;
    const textElement = e.target.parentNode.previousSibling.previousSibling;
    const beforeText = textElement.textContent;
    if (currentElement.textContent === 'UPDATE') {
        currentElement.textContent = 'FINISH';
        textElement.innerHTML = `<textarea>${beforeText}</textarea>`;
    } else {
        currentElement.textContent = 'UPDATE';
        const changeText = {
            _id: id,
            text: textElement.children[0].value
        }
        await updateData(changeText);
        textElement.innerHTML = `${changeText.text}`;
    }
}

const deleted = async (id, history) => {
    await deleteData(id);
    await deleteReply(id);
    history.goBack();
}

const View = ({ location, match, history }) => {
    const userId = sessionStorage.getItem("id");
    const { _id, id, title, text, view } = location.state;
    const { number: n } = match.params;
    return (
        <div className="view">
            <div>
                <div>
                    post {n}
                    <div className="view-count">
                        views: {view + 1}
                    </div>
                </div>
                <hr className="view-boundary" />
                <div>
                    {id}
                </div>
                <hr className="view-boundary" />
                <div>
                    {title}
                </div>
                <hr className="view-boundary" />
                <div className="view-text">
                    {text}
                </div>
                <Button style={{ position: "absolute", fontWeight: "bold" }} startIcon={<MdArrowBack />} className="back-button" onClick={() => history.goBack()}>BACK</Button>
                {
                    userId === id ?
                        <div className="private-button">
                            <Button variant="contained" startIcon={<MdEdit />} onClick={e => update(e, _id)}>UPDATE</Button>
                            <Button variant="contained" startIcon={<MdDeleteOutline />} onClick={() => deleted(_id, history)}>DELETE</Button>
                        </div> : null
                }
            </div>
            <Reply boardId={_id} />
        </div>
    )
}

export default View;
