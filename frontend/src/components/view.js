import React from "react";
import { deleteData, deleteReply } from "../lib/api";
import "./css/view.css"
import Recommend from "./recommend";
import Reply from "./reply";

const deleted = async (id, history) => {
    await deleteData(id);
    await deleteReply(id);
    history.goBack();
}

const View = ({ location, match, history }) => {
    const { _id, id, text, view } = location.state;
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
                    {text}
                </div>
                <button onClick={() => history.goBack()}>BACK</button>
                <button onClick={() => deleted(_id, history)}>DELETE</button>
            </div>
            <Recommend _id={_id} />
            <Reply boardId={_id} />
        </div>
    )
}

export default View;
