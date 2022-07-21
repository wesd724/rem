import c from "../connect.js"
import dotenv from "dotenv";
dotenv.config();

export const register = async ({ id, password, email }) => {
    return await c.then(async (connection) => {
        const db = connection.db(process.env.DB_NAME);
        const accountCollection = db.collection('account');
        const result = await accountCollection.find({ id }).toArray();
        if (result.length !== 0) {
            return false;
        }
        await accountCollection.insertOne({
            id,
            password,
            email
        });
        return true;
    })
}
