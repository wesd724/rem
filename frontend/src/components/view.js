import { Button } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { MdArrowBack, MdDeleteOutline, MdEdit } from "react-icons/md";
import { addViews, deleteData, deleteReply, readViewText, updateData } from "../lib/api";
import "./css/view.css"
import Recommend from "./recommend";
import Reply from "./reply";

const deleted = async (id, history) => {
    await deleteData(id);
    await deleteReply(id);
    history.goBack();
}

const View = ({ location, match, history }) => {
    const { _id, id, title } = location.state;
    const { number: n } = match.params;
    const userId = sessionStorage.getItem("id");

    const [viewText, setViewText] = useState("");
    const [view, setView] = useState(null);

    const [flag, setFlag] = useState(true);

    const textChange = e => setViewText(e.target.value);

    useEffect(() => {
        const viewAndText = async () => {
            await addViews({ _id });
            readViewText({ _id }).then(res => {
                setViewText(res.data.text);
                setView(res.data.view);
            });
        }
        viewAndText();
    }, [_id]);

    const update = useCallback(async (e, id) => {
        const currentElement = e.target;
        setFlag(!flag);
        if (currentElement.textContent === 'UPDATE') {
            currentElement.textContent = 'FINISH';
        } else {
            currentElement.textContent = 'UPDATE';

            await updateData({
                _id: id,
                text: viewText
            });
        }
    }, [flag, viewText]);

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
                    {
                        flag ?
                            <div>{viewText}</div> :
                            <textarea value={viewText} onChange={textChange} />
                    }
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
            <Recommend _id={_id} />
            <Reply boardId={_id} />
        </div>
    )
}

export default View;
