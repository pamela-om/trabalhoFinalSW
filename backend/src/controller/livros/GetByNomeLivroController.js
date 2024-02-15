import { prisma } from '../../database/client.js';

export class GetByNomeLivroController {
  async handle(request, response) {
    try {
      const { titulo } = request.params;
      const livro = await prisma.livro.findFirst({
        where: {
          titulo: {
            equals: titulo,
          },
        },
      });
      if (!livro) {
        return response.status(404).json({ error: 'Livro não encontrado' });
      }
      return response.json(livro);
    } catch (error) {
      console.error('Erro ao buscar o livro pelo título:', error);
      return response.status(500).json({ error: 'Erro ao buscar o livro pelo título' });
    }
  }
}
