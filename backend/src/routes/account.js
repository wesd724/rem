import express from 'express';
import { login } from '../mongodb/account/login.js';
import { register } from '../mongodb/account/register.js';

const accountRounter = express.Router();

accountRounter.post('/login', (req, res) => {
    login(req.body).then(response => res.send(response));
});

accountRounter.post('/register', (req, res) => {
    register(req.body).then(response => res.send(response));
});

export default accountRounter;
