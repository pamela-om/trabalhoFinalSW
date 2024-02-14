import { prisma } from "../../database/client.js";

export class GetByIdEmprestimoController {
  async handle(request, response) {
    const { id } = request.params;
    
    const emprestimo = await prisma.emprestimo.findUnique({
      where: {
        id: parseInt(id)
      }
    });
  
    if (!emprestimo) {
      return response.status(404).json({ error: 'Empréstimo não encontrado' });
    }
  
    return response.json(emprestimo);
  }
}  