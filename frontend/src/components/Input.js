import axios from "axios";
import React, { useCallback, useState } from "react";
import "./css/input.css"

const inputData = data => {
    axios.post("http://localhost:5000/create", data)
        .then(res => console.log(res.data));
}

const InputForm = () => {
    const [data, setData] = useState({
        id: "",
        text: "",
    });

    const change = useCallback(e => {
        setData(data => {
            return { ...data, [e.target.name]: e.target.value };
        }
        )
    }, []);

    const click = useCallback(e => {
        inputData(data);
    }, [data]);

    return (
        <>
            <div>
                <b>ID</b>: <input className="id" name="id" type="text" onChange={change} value={data.id} ></input>
            </div>
            <b>TEXT</b><br />
            <textarea className="text" name="text" onChange={change} value={data.text}></textarea>
            <button onClick={click}>WRITE</button>
        </>
    )
}

export default InputForm;