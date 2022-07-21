import React, { useCallback, useState } from "react";
import { register } from "../lib/api";
import "./css/signUp.css";

const SignUp = ({ history }) => {
    const [account, setAccount] = useState({
        id: "",
        password: "",
        email: ""
    })

    const [confirm, setConfirm] = useState('');

    const change = useCallback(e => {
        setAccount(account => {
            return { ...account, [e.target.name]: e.target.value };
        });
    }, []);

    const confirmChange = useCallback(e => setConfirm(e.target.value), []);

    const click = useCallback(() => {
        for (const key in account) {
            if (account[key] === "") {
                alert("please fill in the blank");
                return;
            }
        }
        if (account.password !== confirm) {
            alert("not equal password");
            return;
        }
        const regex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+/;
        if (regex.test(account.email) === false) {
            alert("please write EMAIL FORMAT");
            return;
        }
        register(account).then(res => {
            if (res.data) {
                alert("REGISTER FINISH");
                history.push('/');
            }
            else {
                alert("SAME ID ALREADY EXISTS");
            }
        });
    }, [account, confirm, history]);

    return (
        <div className="sign-up">
            <h3 style={{ marginLeft: "90px" }}>SIGN UP</h3>
            <input type="text" name="id" onChange={change} maxLength="15" placeholder="YOUR OWN ID 15 LENGTH"></input><br />
            <input type="password" name="password" onChange={change} placeholder="YOUR PASSWORD"></input><br />
            <input type="password" name="pwdconfirm" onChange={confirmChange} placeholder="PASSWORD CONFIRM"></input><br />
            <input type="email" name="email" onChange={change} placeholder="YOUR EMAIL"></input><br />
            <button className="button" onClick={click}>REGISTER</button>
        </div>
    )
}

export default SignUp;
