import { Router } from 'express';
import { CreateClienteController } from '../controller/clientes/CreateClienteController.js';
import { GetClienteNameByIdController } from '../controller/clientes/GetClienteNameByIdController.js';
import { LoginClienteController } from '../controller/clientes/LoginClienteController.js';

const clienteRouter = Router();

const createClienteController = new CreateClienteController();
clienteRouter.post('/clientes', createClienteController.handle);

const getNomeClienteByIdController = new GetClienteNameByIdController();
clienteRouter.get('/clientes/:id', getNomeClienteByIdController.handle);

const loginClienteController = new LoginClienteController();
clienteRouter.post('/clientes/login', loginClienteController.handle);

export { clienteRouter }