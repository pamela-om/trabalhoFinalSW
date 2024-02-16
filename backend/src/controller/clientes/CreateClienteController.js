import { prisma } from '../../database/client.js'

export class CreateClienteController {
    async handle(request, response) {
      const { nome, email, senha } = request.body;
  
      const cliente = await prisma.cliente.create({
        data: {
          nome,
          email,
          senha,
        }
      });
  
      return response.json(cliente);
    }
  }