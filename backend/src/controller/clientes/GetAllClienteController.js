import { prisma } from '../../database/client.js'

export class GetAllClienteController {
    async handle(request, response) {
      const clientes = await prisma.cliente.findMany();
  
      return response.json(clientes);
    }
  }