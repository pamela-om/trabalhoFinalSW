import { Router } from 'express';
import { CreateEmprestimoController } from '../controller/emprestimos/CreateEmprestimoController.js';
import { GetAllEmprestimoController } from '../controller/emprestimos/GetAllEmprestimoController.js';
import { GetByIdEmprestimoController } from '../controller/emprestimos/GetByIdEmprestimoController.js';
import { UpdateEmprestimoController } from '../controller/emprestimos/UpdateEmprestimoController.js';

import { DeleteEmprestimoController } from '../controller/emprestimos/DeleteEmprestimoController.js';
import { DesativarEmprestimoController } from '../controller/emprestimos/DesativarEmprestimoController.js';

const emprestimoRouter = Router();

// Create
const createEmprestimoController = new CreateEmprestimoController();
emprestimoRouter.post('/emprestimos', createEmprestimoController.handle);

// Get All
const getAllEmprestimoController = new GetAllEmprestimoController();
emprestimoRouter.get('/emprestimos', getAllEmprestimoController.handle);

// Get By Id
const getByIdEmprestimoController = new GetByIdEmprestimoController();
emprestimoRouter.get('/emprestimos/:id', getByIdEmprestimoController.handle);

// Update
const updateEmprestimoController = new UpdateEmprestimoController();
emprestimoRouter.put('/emprestimos', updateEmprestimoController.handle);

// Delete
const deleteEmprestimoController = new DeleteEmprestimoController();
emprestimoRouter.delete('/emprestimos', deleteEmprestimoController.handle);

const desativarEmprestimoController = new DesativarEmprestimoController();
emprestimoRouter.patch('/emprestimos/devolucao', desativarEmprestimoController.handle);

export { emprestimoRouter }