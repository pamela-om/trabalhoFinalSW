import { prisma } from '../../database/client.js';

export class CreateEmprestimoController {
  async handle(request, response) {
    const { livro_id, cliente_id, dataDevolucao } = request.body;
  
    // Encontrar o livro correspondente pelo ID
    const livro = await prisma.livro.findUnique({
      where: {
        id: livro_id
      }
    });

    if (!livro) {
      return response.status(404).json({ error: 'Livro não encontrado' });
    }

    // Verificar se o livro está disponível
    if (!livro.disponivel) {
      return response.status(400).json({ error: 'Livro indisponível para empréstimo' });
    }

    // Atualizar o status de disponibilidade do livro para false
    await prisma.livro.update({
      where: {
        id: livro_id
      },
      data: {
        disponivel: false
      }
    });

    // Registrar o empréstimo como não finalizado
    const emprestimo = await prisma.emprestimo.create({
      data: {
        livro: {
          connect: {
            id: livro_id
          }
        },
        cliente: {
          connect: {
            id: cliente_id
          }
        },
        ativo: true, 
        dataDevolucao// Empréstimo não finalizado
      }
    });

    return response.json(emprestimo);
  }
}
