import { prisma } from "../../database/client.js";

export class GetEmprestimoByClienteIdController {
  async handle(request, response) {
    const { id } = request.params;

    try {
      const emprestimos = await prisma.emprestimo.findMany({
        where: {
          cliente_id: parseInt(id)
        }
      });

      return response.json(emprestimos);
    } catch (error) {
      console.error('Erro ao buscar empréstimos:', error);
      return response.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}
