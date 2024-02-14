import { prisma } from '../../database/client.js'

export class UpdateEmprestimoController {
    async handle(request, response) {
      const { id, livro_id, cliente_id, dataDevolucao } = request.body;
  
      try {
        const emprestimo = await prisma.emprestimo.update({
          where: {
            id: parseInt(id)
          },
          data: {
            livro: {
              connect: {
                id: livro_id
              }
            },
            cliente: {
              connect: {
                id: cliente_id
              }
            },
            dataDevolucao
          }
        });
  
        return response.json(emprestimo);
      } catch (error) {
        console.error(error);
        return response.status(400).json(error);
      }
    }
  }