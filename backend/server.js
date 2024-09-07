require('dotenv').config({ path: 'credentials.env' });
const express = require('express');
const cors = require('cors');
const path = require('path')
const { connectToDatabase } = require('./config/db');
const errorMiddleware = require('./middleware/errorMiddleware');
const userRoutes = require('./routes/userRoutes');
const supplierRoutes = require('./routes/supplierRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

connectToDatabase().then(() => {
    app.use('/api/user', userRoutes);
    app.use('/api/supplier', supplierRoutes);
    app.use('/api/product', productRoutes);

    app.use(errorMiddleware);

    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });
}).catch(error => {
    console.error('Erro ao conectar ao banco de dados:', error);
});
