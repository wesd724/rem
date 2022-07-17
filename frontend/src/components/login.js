import React, { useCallback, useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { login } from "../lib/api";
import { userContext } from "../store/context";
import "./css/login.css"

const Login = () => {
    const history = useHistory();
    const { userId: id, setUserId } = useContext(userContext);

    const [password, setPassword] = useState('');

    const changeId = useCallback(e => setUserId(e.target.value), [setUserId]);
    const changePassword = useCallback(e => setPassword(e.target.value), []);

    const submit = useCallback(e => {
        login({ id, password }).then(res => {
            if (res.data === true) {
                setUserId(id);
                history.push('/board');
            } else if (res.data === false) {
                alert("Not Registered");
            } else {
                alert(res.data);
            }
        });
        e.preventDefault();
    }, [id, setUserId, password, history]);

    return (
        <div className="login">
            <h3>LOGIN</h3>
            <form onSubmit={submit}>
                <input type="text" placeholder="ID" onChange={changeId} required></input><br />
                <input type="password" placeholder="PASSWORD" onChange={changePassword} required></input><br />
                <button type="submit">login</button>
            </form>
            <Link to='/register'><button>sign up</button></Link>
            <Link to={{
                pathname: '/board',
                state: {
                    userId: ""
                }
            }}><button onClick={() => {
                setUserId("");
                history.push('/board');
            }}>anonymous</button></Link>
        </div >
    )
}

export default Login;
