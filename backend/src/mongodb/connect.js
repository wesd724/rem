import { MongoClient } from "mongodb";
import dotenv from 'dotenv';

dotenv.config();

const client = new MongoClient(process.env.DB_URL);
const c = client.connect();

export default c;
