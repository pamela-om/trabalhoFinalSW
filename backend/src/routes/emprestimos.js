import { Router } from 'express';
import { CreateEmprestimoController } from '../controller/emprestimos/CreateEmprestimoController.js';
import { GetEmprestimoByClienteIdController } from '../controller/emprestimos/GetEmprestimoByClienteIdController.js';
import { DesativarEmprestimoController } from '../controller/emprestimos/DesativarEmprestimoController.js';

const emprestimoRouter = Router();

const createEmprestimoController = new CreateEmprestimoController();
emprestimoRouter.post('/emprestimos', createEmprestimoController.handle);

const getEmprestimoByClienteIdController = new GetEmprestimoByClienteIdController();
emprestimoRouter.get('/emprestimos/cliente/:id', getEmprestimoByClienteIdController.handle);

const desativarEmprestimoController = new DesativarEmprestimoController();
emprestimoRouter.patch('/emprestimos/devolucao', desativarEmprestimoController.handle);

export { emprestimoRouter }