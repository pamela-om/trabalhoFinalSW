import { prisma } from '../../database/client.js';
import { addMonths } from 'date-fns';

export class CreateEmprestimoController {
  async handle(request, response) {
    const { livro_id, cliente_id } = request.body;
  
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

    // Calcular a data de devolução (um mês após a data atual)
    const dataAtual = new Date();
    const dataDevolucao = addMonths(dataAtual, 1);

    // Registrar o empréstimo
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
        dataDevolucao // Data de devolução calculada
      }
    });

    return response.json(emprestimo);
  }
}
