import connect from "../connect.js"
import dotenv from "dotenv";
dotenv.config();

export const login = async ({ id, password }) => {
    return await connect().then(async (connection) => {
        const db = connection.db(process.env.DB_NAME);
        const accountCollection = db.collection('account');

        const cursor = accountCollection.find({ id });
        const result = await cursor.toArray();
        if (result.length === 0) return false;
        else if (result[0].password === password) return true;
        else return "The password is wrong";
    })
}
