import React, { useCallback, useEffect, useRef, useState } from "react";
import List from "./List";
import { createData, newReply, readData } from "../lib/api";
import "./css/input.css";

const InputForm = () => {
    const [data, setData] = useState({
        id: "",
        text: ""
    });

    const [list, setList] = useState([]);

    const element = useRef();

    const change = useCallback(e => {
        setData(data => {
            return { ...data, [e.target.name]: e.target.value };
        }
        )
    }, []);

    useEffect(() => {
        console.log(`Input useEffect post("/read") call rendering`);
        readData().then(res => setList([...res.data]));
    }, [])

    const { id, text } = data;

    const click = useCallback(async () => {
        await createData(data);
        const { data: readResult } = await readData();
        const createDataObjectId = readResult.at(-1)["_id"];
        await newReply({ _id: createDataObjectId });
        setList([...readResult]);
        setData({ id: "", text: "" });
        element.current.focus();
    }, [data]);

    return (
        <div className="form">
            <div>
                <b>ID</b>:
                <input className="id" name="id" type="text" onChange={change} value={id} ref={element} ></input>
            </div>
            <div>
                <b>TEXT</b><br />
                <textarea className="textarea" name="text" onChange={change} value={text}></textarea>
                <button className="textbutton" onClick={click}>WRITE</button>
            </div>
            <List lists={list} setList={setList} readData={readData} />
        </div>
    )
}

export default InputForm;
