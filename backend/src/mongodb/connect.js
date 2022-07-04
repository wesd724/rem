import { MongoClient } from "mongodb";
import dotenv from 'dotenv';

dotenv.config();

const connect = () => MongoClient.connect(process.env.DB_URL);

export default connect;