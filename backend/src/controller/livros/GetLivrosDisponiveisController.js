import { prisma } from '../../database/client.js'

export class GetLivrosDisponiveisController {
    async handle(request, response) {
        try {
            const livrosDisponiveis = await prisma.livro.findMany({
              where: {
                disponivel: true,
              },
            });
            return response.json(livrosDisponiveis);
          } catch (error) {
            console.error('Erro ao buscar os livros disponíveis:', error);
            return response.status(500).json({ error: 'Erro ao buscar os livros disponíveis' });
          }
  }
}