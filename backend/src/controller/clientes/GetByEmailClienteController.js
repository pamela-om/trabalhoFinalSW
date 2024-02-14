import { prisma } from "../../database/client.js";

export class GetByEmailClienteController {
    async handle(request, response) {
      const { email } = request.params;
  
      const cliente = await prisma.cliente.findUnique({
        where: {
          email: parseInt(email)
        }
      });
  
      return response.json(cliente);
    }
  }