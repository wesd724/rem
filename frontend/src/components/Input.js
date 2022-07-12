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

    const [listLength, setListLength] = useState(0);

    const element = useRef();

    const change = useCallback(e => {
        setData(data => {
            return { ...data, [e.target.name]: e.target.value };
        }
        )
    }, []);

    useEffect(() => {
        console.log(`Input useEffect post("/read") call rendering`);
        readData(1).then(res => {
            setListLength(res.data.length);
            setList([...res.data.result]);
        });
    }, [])
    const { id, text } = data;

    const click = useCallback(async () => {
        await createData(data);
        const { result: readList } = await readData(Math.ceil((listLength + 1) / 7)).then(res => res.data);
        const createDataObjectId = readList.at(-1)["_id"];
        await newReply({ _id: createDataObjectId });
        setList([...readList]);
        setData({ id: "", text: "" });
        setListLength(l => l + 1);
        element.current.focus();
    }, [data, listLength]);

    const readPage = useCallback(async (page) => {
        const { result: readList } = await readData(page).then(res => res.data);
        setList([...readList]);
    }, []);

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
            <ul className="pages">
                {Array.from({ length: Math.ceil(listLength / 7) })
                    .map((_, index) =>
                        <li key={index} onClick={() => readPage(index + 1)}>{index + 1}</li>
                    )}
            </ul>
        </div>
    )
}

export default InputForm;
