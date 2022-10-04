import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import List from "./List";
import { createData, readData } from "../lib/api";
import "./css/input.css";
import { LIST_LENGTH_PER_PAGE } from "../data/constant";
import { userContext } from "../store/context";
import { Button, TextField } from "@mui/material";

const InputForm = () => {
    const userId = sessionStorage.getItem("id");
    const { page, setPage } = useContext(userContext);
    const [data, setData] = useState({
        id: userId,
        title: "",
        text: ""
    });

    const [list, setList] = useState([]);

    const [listLength, setListLength] = useState(0);
    const element = useRef();

    const { id, title, text } = data;

    const change = useCallback(e => {
        setData(data => {
            return { ...data, [e.target.name]: e.target.value };
        });
    }, []);

    useEffect(() => {
        readData(page).then(res => {
            if (res.data.result.length === 0 && res.data.length > 0) {
                readData(page - 1).then(res => {
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

    const click = useCallback(async () => {
        if (data.title === "" || data.text === "") {
            alert("please fill in the blank");
            return;
        }
        await createData(data);
        const { result: readList } = await readData(1).then(res => res.data);
        setList([...readList]);
        setData({ ...data, title: "", text: "" });
        setListLength(l => l + 1);
        setPage(1);
        element.current.lastChild.firstChild.focus();
    }, [data, setPage]);

    const readPage = useCallback(async (page) => {
        const { result: readList } = await readData(page).then(res => res.data);
        setList([...readList]);
        setPage(page);
    }, [setPage]);

    const logout = () => {
        sessionStorage.removeItem("id");
        window.location.replace("/");
    }

    return (
        <div className="form">
            <div>
                <Button style={{ position: "fixed" }} className="logout-button" onClick={logout} variant="outlined" color="error">LOGOUT</Button>
            </div>
            <div>
                <TextField size="small" inputProps={{ maxLength: 18 }} name="title" className="title" id="filled-basic" label="TITLE" variant="filled" value={title} onChange={change} ref={element} />
            </div>
            <div>
                <TextField
                    size="small"
                    className="textarea"
                    name="text"
                    id="outlined-multiline-flexible"
                    label="TEXT"
                    multiline
                    maxRows={2}
                    value={text}
                    onChange={change}
                />
                <Button className="write-button" onClick={click} variant="outlined">WRITE</Button>
            </div>
            <List lists={list} />
            <ul className="pages">
                {Array.from({ length: Math.ceil(listLength / LIST_LENGTH_PER_PAGE) })
                    .map((_, index) =>
                        <Button sx={{ minWidth: 40, bgcolor: "#9CB4CC", color: "black" }} className="page-btn" variant="contained" key={index} onClick={() => readPage(index + 1)}>{index + 1}</Button>
                    )}
            </ul>
            <b>ID: {id}</b><br />
        </div>
    )
}

export default InputForm;
