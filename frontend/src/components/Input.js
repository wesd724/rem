import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import "./css/input.css"
import List from "./List";

const inputData = data => {
    return axios.post(process.env.REACT_APP_CREATE_URL, data);
  }

const readData = () => {
    return axios.get(process.env.REACT_APP_READ_URL);
  }

const InputForm = () => {
    const [data, setData] = useState({
        id: "",
        text: ""
    });

    const [list, setList] = useState([]);

    useEffect(() => {
        console.log(`Input useEffect post("/read") call rendering`);
        readData().then(res => setList([...res.data]));
    }, [])

    const change = useCallback(e => {
        setData(data => {
            return { ...data, [e.target.name]: e.target.value };
        }
        )
    }, []);

    const { id, text } = data;

    const click = useCallback(async () => {
        await inputData(data);
        const { data: readResult } = await readData();
        setList([...readResult]);
    }, [data]);

    return (
        <>
            <div>
                <b>ID</b>:
                <input className="id" name="id" type="text" onChange={change} value={id} ></input>
            </div>
            <b>TEXT</b><br />
            <textarea className="text" name="text" onChange={change} value={text}></textarea>
            <button onClick={click}>WRITE</button>
            <List lists={list} setList={setList} readData={readData} />
        </>
    )
}

export default InputForm;