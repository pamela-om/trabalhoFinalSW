import { prisma } from "../../database/client.js";

export class GetNomeLivroByEmprestimoController {
  async handle(request, response) {
    const { id } = request.params;

    try {
      // Encontrar o livro pelo ID fornecido
      const livro = await prisma.livro.findUnique({
        where: {
          id: parseInt(id)
        },
        select: {
          titulo: true
        }
      });

      // Verificar se o livro foi encontrado
      if (!livro) {
        return response.status(404).json({ error: 'Livro não encontrado' });
      }

      // Retornar o nome do livro
      return response.json({ nomeLivro: livro.titulo });
    } catch (error) {
      console.error('Erro ao buscar nome do livro:', error);
      return response.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}
