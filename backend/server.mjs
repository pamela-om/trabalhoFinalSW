import express from 'express'
import cors from 'cors';
import { clienteRouter } from './src/routes/clientes.js';
import { emprestimoRouter } from './src/routes/emprestimos.js'
import { livroRouter } from './src/routes/livros.js';

import dotenv from 'dotenv';

dotenv.config();
const server = express();
const PORT = 5000

// Routes
server.get('/', (request, response) => {
    response.json({
        message: 'Status: Server is running.'
    })
})

server.use(express.json())
server.use(cors());
server.use(clienteRouter);
server.use(emprestimoRouter);
server.use(livroRouter);

server.listen(PORT, () => {
    console.log(`[SERVER] Server is running on port ${PORT}`)
})