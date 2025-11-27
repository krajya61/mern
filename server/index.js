import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import clientRoutes from './routes/client.js';
import generalRoutes from './routes/general.js';
import managementRoutes from './routes/management.js';
import salesRoutes from './routes/sales.js';

// data imports
import User from "./models/User.js";
import Product from "./models/Product.js";
import ProductStat from "./models/ProductStat.js";
import Transaction from "./models/Transaction.js";
import OverallStat from "./models/OverallStat.js";
import AffiliateStat from "./models/AffiliateStat.js";
import {
  dataUser,
  dataProduct,
  dataProductStat,
  dataTransaction,
  dataOverallStat,
  dataAffiliateStat,
} from "./data/index.js";

/* CONFIGURATIONS */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* ROUTES */
app.use('/client', clientRoutes);
app.use('/general', generalRoutes);
app.use('/management', managementRoutes);
app.use('/sales', salesRoutes);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 9000;

async function startServer() {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('MongoDB Connected');

        app.listen(PORT, () => {
            console.log(`Server Port: ${PORT}`);
        });

        /* ONLY ADD DATA ONE TIME */
        // await AffiliateStat.insertMany(dataAffiliateStat);
        // await OverallStat.insertMany(dataOverallStat);
        // await Product.insertMany(dataProduct);
        // await ProductStat.insertMany(dataProductStat);
        // await Transaction.insertMany(dataTransaction);
        // await User.insertMany(dataUser);

    } catch (err) {
        console.error('Database Connection Failed:', err);
    }
}

startServer();