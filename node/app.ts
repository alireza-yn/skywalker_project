import express, { Application } from 'express';
import connectDB from './db/mongo';
import userRoutes from './routes/users';

const app: Application = express();
const PORT: number = 3000;

// اتصال به MongoDB
connectDB();

// میدل‌ورها
app.use(express.json());

// مسیرها
app.use('/api/users', userRoutes);

// شروع سرور
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
