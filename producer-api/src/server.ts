import app from './index';
import dotenv from 'dotenv';
import cepRouter from './routes/cepRouter';
import { connectMongo } from './config/mongo';

dotenv.config();

const PORT = process.env.PORT;
connectMongo();
app.use(cepRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
