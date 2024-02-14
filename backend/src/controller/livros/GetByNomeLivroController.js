import { prisma } from '../../database/client.js';

export class GetByNomeLivroController {
  async handle(request, response) {
    const { titulo } = request.query;
    
    const livro = await prisma.livro.findUnique({
      where: {
        titulo: titulo
      }
    });

    if (!livro) {
      return response.status(404).json({ error: 'Livro não encontrado' });
    }

    return response.json(livro);
  }
}
