import express from 'express';

import cors from 'cors';
import { connectToDatabase } from './connection/dbconnect.js';
import dotenv from 'dotenv';


import userRoutes from './routes/user-route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({
  origin: '*',
}));
app.use(express.json());

connectToDatabase();

app.use('/api/users',userRoutes);


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})

