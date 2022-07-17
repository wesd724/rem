import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import List from "./List";
import { createData, newReply, readData } from "../lib/api";
import "./css/input.css";
import { LIST_LENGTH_PER_PAGE } from "../data/constant";
import { userContext } from "../store/context";

const InputForm = () => {
    const { page, setPage, userId } = useContext(userContext);
    const [data, setData] = useState({
        id: userId,
        title: "",
        text: ""
    });

    const [list, setList] = useState([]);

    const [listLength, setListLength] = useState(0);
    const element = useRef();

    const change = useCallback(e => {
        setData(data => {
            return { ...data, [e.target.name]: e.target.value };
        });
    }, []);

    useEffect(() => {
        console.log(`Input useEffect post("/read") call rendering`);
        readData(page).then(res => {
            if (res.data.result.length === 0 && res.data.length > 0) {
                readData(page - 1).then(res => {
                    console.log(`no text in page ${page}`);
                    setListLength(res.data.length);
                    setList([...res.data.result]);
                    setPage(page - 1);
                });
            } else {
                setListLength(res.data.length);
                setList([...res.data.result]);
            }
        });
    }, [page, setPage])

    const { id, title, text } = data;

    const click = useCallback(async () => {
        await createData(data);
        const { result: readList } = await readData(Math.ceil((listLength + 1) / LIST_LENGTH_PER_PAGE))
            .then(res => res.data);
        const createDataObjectId = readList.at(-1)["_id"];
        await newReply({ _id: createDataObjectId });
        setList([...readList]);
        setData({ ...data, title: "", text: "" });
        setListLength(l => l + 1);
        setPage(Math.ceil((listLength + 1) / LIST_LENGTH_PER_PAGE));
        element.current.focus();
    }, [data, listLength, setPage]);

    const readPage = useCallback(async (page) => {
        const { result: readList } = await readData(page).then(res => res.data);
        setList([...readList]);
        setPage(page);
    }, [setPage]);

    return (
        <div className="form">
            <div>
                <b>ID: {id}</b><br />
                <button className="logout" onClick={() => window.location.replace("/")}>LOGOUT</button>
            </div>
            <div>
                <b>TITLE</b><br />
                <input className="title" name="title" onChange={change} value={title} ref={element} ></input>
            </div>
            <div>
                <b>TEXT</b><br />
                <textarea className="textarea" name="text" onChange={change} value={text}></textarea>
                <button className="textbutton" onClick={click}>WRITE</button>
            </div>
            <List lists={list} />
            <ul className="pages">
                {Array.from({ length: Math.ceil(listLength / LIST_LENGTH_PER_PAGE) })
                    .map((_, index) =>
                        <li key={index} onClick={() => readPage(index + 1)}>{index + 1}</li>
                    )}
            </ul>
        </div>
    )
}

export default InputForm;
