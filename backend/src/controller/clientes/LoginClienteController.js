import { prisma } from '../../database/client.js';
import jwt from 'jsonwebtoken';

export class LoginClienteController {
    async handle(request, response) {
        const { email, senha } = request.body;

        const cliente = await prisma.cliente.findUnique({
            where: { email }
        });

        if (!cliente || cliente.senha !== senha) {
            return response.status(401).json({ error: 'Credenciais inválidas' });
        }

        const token = jwt.sign({ id: cliente.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return response.json({ token });
    }
}
