import React, { useCallback, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { login } from "../lib/api";
import "./css/login.css"

const Login = () => {
    const history = useHistory();
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

    return (
        <div className="login">
            <h3 style={{marginLeft: "75px"}}>LOGIN</h3>
            <form onSubmit={submit}>
                <input type="text" placeholder="ID" onChange={changeId} required></input><br />
                <input type="password" placeholder="PASSWORD" onChange={changePassword} required></input><br />
                <button className="button login-button" type="submit">login</button>
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
