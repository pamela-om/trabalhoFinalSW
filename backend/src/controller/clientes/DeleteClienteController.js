export class DeleteClienteController {
    async handle(request, response) {
      const { id } = request.body;
  
      try {
        const cliente = await prisma.cliente.delete({
          where: {
            id: parseInt(id)
          }
        });
  
        return response.json(cliente);
      } catch (error) {
        console.error(error);
        return response.status(400).json(error);
      }
    }
  }
  