import React from "react";
import { deleteData, deleteReply, updateData } from "../lib/api";
import "./css/view.css"
import Recommend from "./recommend";
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
        <div>
            <div className="view">
                <div>
                    post {n}
                </div>
                <div className="view-count">
                    views: {view + 1}
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
                <button onClick={() => history.goBack()}>BACK</button>
                {
                    userId === id ?
                        <div className="private-button">
                            <button onClick={e => update(e, _id)}>UPDATE</button>
                            <button onClick={() => deleted(_id, history)}>DELETE</button>
                        </div> : null
                }
            </div>
            <Recommend _id={_id} />
            <Reply boardId={_id} />
        </div>
    )
}

export default View;
