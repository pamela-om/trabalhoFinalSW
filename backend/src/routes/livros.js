import { Router } from 'express';
import { GetAllLivroController } from '../controller/livros/GetAllLivroController.js';
import { GetByNomeLivroController } from '../controller/livros/GetByNomeLivroController.js';
import { GetLivrosDisponiveisController } from '../controller/livros/GetLivrosDisponiveisController.js';
import { GetNomeLivroByEmprestimoController } from '../controller/livros/GetNomeLivroByEmprestimoController.js';

const livroRouter = Router();

const getAllLivroController = new GetAllLivroController();
livroRouter.get('/livros', getAllLivroController.handle);

const getByNomeLivroController = new GetByNomeLivroController();
livroRouter.get('/livros/:titulo', getByNomeLivroController.handle);

const getLivrosDisponiveisController = new GetLivrosDisponiveisController();
livroRouter.get('/livrosDisponiveis', getLivrosDisponiveisController.handle);

const getNomeLivroByEmprestimoController = new GetNomeLivroByEmprestimoController();
livroRouter.get('/livros/emprestimo/:id', getNomeLivroByEmprestimoController.handle);

export { livroRouter }