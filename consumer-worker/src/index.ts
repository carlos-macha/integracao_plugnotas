import { connectMongo } from "./config/mongo";
import { CepWorker } from "./workers/cepWorker";
import dotenv from 'dotenv';

dotenv.config();

(async () => {
    await connectMongo();

    const loop = async () => {
      await CepWorker();
      setTimeout(loop, 1000);
    };
  
    loop();
  })();
