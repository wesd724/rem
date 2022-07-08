import React from "react";
import { deleteData, deleteReply } from "../lib/api";
import "./css/view.css"
import Reply from "./reply";

const deleted = async (id, history) => {
    await deleteData(id);
    await deleteReply(id);
    history.goBack();
}

const View = ({ location, match, history }) => {
    const { _id, id, text } = location.state;
    const { number: n } = match.params;
    return (
        <div>
            <div className="view">
                <div>
                    <span>
                        post {n}
                    </span>
                    <hr className="view-boundary" />
                    <p>
                        {id}
                    </p>
                </div>
                <hr className="view-boundary" />
                <div>
                    <span>
                        {text}
                    </span>
                </div>
                <button onClick={() => history.goBack()}>BACK</button>
                <button onClick={() => deleted(_id, history)}>DELETE</button>
                <Reply boardId={_id} />
            </div>
        </div>
    )
}

export default View;
