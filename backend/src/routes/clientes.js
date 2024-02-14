import { Router } from 'express';
import { CreateClienteController } from '../controller/clientes/CreateClienteController.js';
import { GetAllClienteController } from '../controller/clientes/GetAllClienteController.js';
import { GetByEmailClienteController } from '../controller/clientes/GetByEmailClienteController.js';
import { UpdateClienteController } from '../controller/clientes/UpdateClienteController.js';

import { DeleteClienteController } from '../controller/clientes/DeleteClienteController.js';

const clienteRouter = Router();

// Create
const createClienteController = new CreateClienteController();
clienteRouter.post('/clientes', createClienteController.handle);

// Get All
const getAllClienteController = new GetAllClienteController();
clienteRouter.get('/clientes', getAllClienteController.handle);

// Get By Id
const getByEmailClienteController = new GetByEmailClienteController();
clienteRouter.get('/clientes/:email', getByEmailClienteController.handle);

// Update
const updateClienteController = new UpdateClienteController();
clienteRouter.put('/clientes', updateClienteController.handle);

// Delete
const deleteClienteController = new DeleteClienteController();
clienteRouter.delete('/clientes', deleteClienteController.handle);

export { clienteRouter }