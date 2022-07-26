import c from "../connect.js"
import dotenv from "dotenv";
import hashPassword from "../../lib/encryption.js";
dotenv.config();

export const login = async ({ id, password }) => {
    return await c.then(async (connection) => {
        const db = connection.db(process.env.DB_NAME);
        const accountCollection = db.collection('account');

        const result = await accountCollection.findOne({ id });
        
        if (result === null) return false;
        else if (result.password === hashPassword(password)) return true;
        else return "The password is wrong";
    })
}
