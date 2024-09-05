require('dotenv').config({ path: 'credentials.env' });
const express = require('express');
const cors = require('cors');
const path = require('path')
const { connectToDatabase } = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const getRoutes = require('./routes/getRoutes');
const delRoutes = require('./routes/delRoutes');
const errorMiddleware = require('./middleware/errorMiddleware');
const infoRoutes = require('./routes/infoRoutes');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

connectToDatabase().then(() => {
    app.use('/api/auth', authRoutes);
    app.use('/api/get', getRoutes);
    app.use('/api/del', delRoutes)
    app.use('/api', infoRoutes);

    app.use(errorMiddleware);

    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });
}).catch(error => {
    console.error('Erro ao conectar ao banco de dados:', error);
});
