import { prisma } from "../../database/client.js";

export class GetClienteNameByIdController {
  async handle(request, response) {
    const { id } = request.params;

    try {
      const cliente = await prisma.cliente.findUnique({
        where: {
          id: parseInt(id)
        },
        select: {
          nome: true
        }
      });

      if (!cliente) {
        return response.status(404).json({ error: 'Cliente não encontrado' });
      }

      return response.json({ nome: cliente.nome });
    } catch (error) {
      console.error('Erro ao buscar cliente:', error);
      return response.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}
