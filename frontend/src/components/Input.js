import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import "./css/input.css"
import List from "./List";

const inputData = data => {
    axios.post(process.env.REACT_APP_CREATE_URL, data)
        .then(res => console.log(res.data));
}

const InputForm = () => {
    const [data, setData] = useState({
        id: "",
        text: ""
    });

    const [list, setList] = useState([]);

    useEffect(() => {
        console.log(`Input useEffect post("/read") call rendering`);
        axios.post(process.env.REACT_APP_READ_URL, {})
            .then(res => setList([...res.data]));
    }, [])

    const change = useCallback(e => {
        setData(data => {
            return { ...data, [e.target.name]: e.target.value };
        }
        )
    }, []);
    
    const { id, text } = data;

    const click = useCallback(() => {
        inputData(data);
        axios.post(process.env.REACT_APP_READ_URL, {})
            .then(res => setList([...res.data]));
    }, [data]);

    return (
        <>
            <div>
                <b>ID</b>: <input className="id" name="id" type="text" onChange={change} value={id} ></input>
            </div>
            <b>TEXT</b><br />
            <textarea className="text" name="text" onChange={change} value={text}></textarea>
            <button onClick={click}>WRITE</button>
            <List lists={list} />
        </>
    )
}

export default InputForm;