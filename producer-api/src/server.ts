import app from './index';
import dotenv from 'dotenv';
import { connectMongo } from './config/mongo';

dotenv.config();

console.log("NODE_ENV:", process.env.NODE_ENV);

const PORT = process.env.PORT || 3000;
connectMongo();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
