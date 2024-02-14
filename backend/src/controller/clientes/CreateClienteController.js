import { prisma } from '../../database/client.js'

export class CreateClienteController {
    async handle(request, response) {
      const { nome, email } = request.body;
  
      const cliente = await prisma.cliente.create({
        data: {
          nome,
          email,
        }
      });
  
      return response.json(cliente);
    }
  }