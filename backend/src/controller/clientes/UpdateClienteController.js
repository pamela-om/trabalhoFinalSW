import { prisma } from '../../database/client.js'

export class UpdateClienteController {
    async handle(request, response) {
      const { id, nome, email } = request.body;
  
      try {
        const cliente = await prisma.cliente.update({
          where: {
            id: parseInt(id)
          },
          data: {
            nome,
            email,
          }
        });
  
        return response.json(cliente);
      } catch (error) {
        console.error(error);
        return response.status(400).json(error);
      }
    }
  }