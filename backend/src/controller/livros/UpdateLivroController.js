import { prisma } from '../../database/client.js'

export class UpdateLivroController {
    async handle(request, response) {
      const { id, titulo, autor, editora, anoPublicacao } = request.body;
  
      try {
        const livro = await prisma.livro.update({
          where: {
            id: parseInt(id)
          },
          data: {
            titulo,
            autor,
            editora,
            anoPublicacao
          }
        });
  
        return response.json(livro);
      } catch (error) {
        console.error(error);
        return response.status(400).json(error);
      }
    }
  }