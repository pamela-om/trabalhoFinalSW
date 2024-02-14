import { prisma } from '../../database/client.js'

export class GetAllEmprestimoController {
    async handle(request, response) {
      const emprestimos = await prisma.emprestimo.findMany();
  
      return response.json(emprestimos);
    }
  }