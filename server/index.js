import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import chatRoutes from './routes/chat.js';
import contactRoutes from './routes/contact.js';

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/chat', chatRoutes);
app.use('/api/contact', contactRoutes);

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
    const buildPath = path.join(__dirname, '..', 'client', 'dist');
    app.use(express.static(buildPath));

    app.get('*', (req, res) => {
        res.sendFile(path.join(buildPath, 'index.html'));
    });
} else {
    app.get('/', (req, res) => {
        res.send('API is running...');
    });
}

// Database Connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err));



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
