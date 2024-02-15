import { prisma } from '../../database/client.js'

export class CreateLivroController {
    async handle(request, response) {
      const { titulo, autor, genero, anoPublicacao } = request.body;
  
      const livro = await prisma.livro.create({
        data: {
          titulo,
          autor,
          genero,
          anoPublicacao
        }
      });
  
      return response.json(livro);
    }
  }