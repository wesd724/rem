import c from "../connect.js"
import dotenv from "dotenv";
import hashPassword from "../../lib/encryption.js";
dotenv.config();

export const register = async ({ id, password, email }) => {
    return await c.then(async (connection) => {
        const db = connection.db(process.env.DB_NAME);
        const accountCollection = db.collection('account');
        
        const result = await accountCollection.findOne({ id });
        if (result !== null) {
            return false;
        }
        await accountCollection.insertOne({
            id,
            password: hashPassword(password),
            email
        });
        return true;
    })
}
