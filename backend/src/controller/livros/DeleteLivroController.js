import { prisma } from '../../database/client.js'

export class DeleteLivroController {
    async handle(request, response) {
      const { id } = request.body;
  
      try {
        const livro = await prisma.livro.delete({
          where: {
            id: parseInt(id)
          }
        });
  
        return response.json(livro);
      } catch (error) {
        console.error(error);
        return response.status(400).json(error);
      }
    }
  }