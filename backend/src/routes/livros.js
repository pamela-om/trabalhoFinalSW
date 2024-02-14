import { Router } from 'express';
import { CreateLivroController } from '../controller/livros/CreateLivroController.js';
import { GetAllLivroController } from '../controller/livros/GetAllLivroController.js';
import { GetByNomeLivroController } from '../controller/livros/GetByNomeLivroController.js';
import { UpdateLivroController } from '../controller/livros/UpdateLivroController.js';

import { DeleteLivroController } from '../controller/livros/DeleteLivroController.js';

const livroRouter = Router();

// Create
const createLivroController = new CreateLivroController();
livroRouter.post('/livros', createLivroController.handle);

// Get All
const getAllLivroController = new GetAllLivroController();
livroRouter.get('/livros', getAllLivroController.handle);

// Get By Id
const getByNomeLivroController = new GetByNomeLivroController();
livroRouter.get('/livros/:titulo', getByNomeLivroController.handle);

// Update
const updateLivroController = new UpdateLivroController();
livroRouter.put('/livros', updateLivroController.handle);

// Delete
const deleteLivroController = new DeleteLivroController();
livroRouter.delete('/livros', deleteLivroController.handle);

export { livroRouter }