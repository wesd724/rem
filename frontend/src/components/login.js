import React, { useCallback, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { AiFillEye } from 'react-icons/ai';
import { login } from "../lib/api";
import "./css/login.css"

const Login = () => {
    const history = useHistory();
    const eye = useRef();
    const [id, setId] = useState("");

    const [password, setPassword] = useState('');

    const changeId = useCallback(e => setId(e.target.value), []);
    const changePassword = useCallback(e => setPassword(e.target.value), []);

    const submit = useCallback(e => {
        login({ id, password }).then(res => {
            if (res.data === true) {
                sessionStorage.setItem("id", id);
                history.push('/board');
            } else if (res.data === false) {
                alert("Not Registered");
            } else {
                alert(res.data);
            }
        });
        e.preventDefault();
    }, [id, password, history]);

    const open = () => {
        if (eye.current.type === "password")
            eye.current.type = "text";
        else eye.current.type = "password";
    }

    return (
        <div className="login">
            <h3 style={{ marginLeft: "75px" }}>LOGIN</h3>
            <form onSubmit={submit}>
                <input type="text" placeholder="ID" onChange={changeId} required></input><br />
                <input type="password" placeholder="PASSWORD" onChange={changePassword} ref={eye} required></input><br />
                <button className="button login-button" type="submit">login</button>
                <div className="eye" onClick={open}>
                    <AiFillEye />
                </div>
            </form>
            <Link to='/register'><button className="button signup-button">sign up</button></Link>
            <button className="button anonymous-button" onClick={() => {
                sessionStorage.setItem("id", "--");
                history.push('/board');
            }}>anonymous</button>
        </div >
    )
}

export default Login;
