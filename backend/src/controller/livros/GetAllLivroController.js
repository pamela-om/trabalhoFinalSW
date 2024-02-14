import { prisma } from '../../database/client.js'

export class GetAllLivroController {
    async handle(request, response) {
      const livros = await prisma.livro.findMany();
  
      return response.json(livros);
    }
  }