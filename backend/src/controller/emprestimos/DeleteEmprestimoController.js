import { prisma } from '../../database/client.js'

export class DeleteEmprestimoController {
    async handle(request, response) {
      const { id } = request.body;
  
      try {
        const emprestimo = await prisma.emprestimo.delete({
          where: {
            id: parseInt(id)
          }
        });
  
        return response.json(emprestimo);
      } catch (error) {
        console.error(error);
        return response.status(400).json(error);
      }
    }
  }