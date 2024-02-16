import React, { useEffect, useState } from 'react';
import { Button, Card, CardContent, CardMedia, Snackbar, Typography } from '@mui/material';
import axios from 'axios';

function CardBook({ titulo, autor, genero, anoPublicacao, imagem, livroId }) {
    const [idCliente, setIdCliente] = useState(null);
    const [token, setToken] = useState(null);
    const [openAlert, setOpenAlert] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const [, payloadBase64] = token.split('.');
                if (payloadBase64) {
                    const payload = JSON.parse(atob(payloadBase64));
                    const idCliente = payload.id;
                    setIdCliente(idCliente);
                    setToken(token);
                }
            } catch (error) {
                console.error('Erro ao decodificar o payload do token:', error);
            }
        }
    }, []);

    const handleAlugarLivro = async () => {
        try {
            const response = await axios.post(
                'http://localhost:5000/emprestimos',
                {
                    livro_id: livroId,
                    cliente_id: idCliente,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            if (!response.data) {
                throw new Error('Erro ao alugar o livro');
            }
            setOpenAlert(true); // Abrir o alerta de sucesso
        } catch (error) {
            console.error('Erro ao alugar o livro:', error);
        }
    };

    const handleCloseAlert = () => {
        setOpenAlert(false);
    };

    return (
        <div>
            <Card sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                backgroundColor: '#fff',
                borderRadius: '8px',
                overflow: 'hidden',
                border: '4px solid #324679',
            }}>
                <CardMedia
                    component="img"
                    height="200"
                    image={imagem}
                    alt={titulo}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h6" component="div">
                        {titulo}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="div">
                        Autor: {autor}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="div">
                        Gênero: {genero}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="div">
                        Ano: {anoPublicacao}
                    </Typography>
                </CardContent>
                <Button
                    size="small"
                    sx={{
                        backgroundColor: '#324679', color: 'white', '&:hover': { backgroundColor: '#293e56' },
                        margin: '6px', alignSelf: 'center', width: '40%'
                    }}
                    variant="fab"
                    onClick={handleAlugarLivro}
                >
                    Alugar
                </Button>
            </Card>
            <Snackbar
                open={openAlert}
                autoHideDuration={6000}
                onClose={handleCloseAlert}
                message="Livro alugado com sucesso!"
            />
        </div>
    );
}

export default CardBook;
