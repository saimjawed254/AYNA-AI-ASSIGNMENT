import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import authRoutes from './routes/auth.routes.js';
import formRoutes from './routes/form.routes.js';
import responseRoutes from "./routes/response.routes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/forms', formRoutes);
app.use("/api/responses", responseRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT || 5000, () => {
      console.log('Server running...');
    });
  })
  .catch(err => console.error(err));
