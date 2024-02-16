import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, TextField, Button, Box } from '@mui/material';
import api from '../Services/api';

function Cadastro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [error, setError] = useState('');

  const handleCadastro = async () => {
    if (senha !== confirmarSenha) {
      setError('As senhas não correspondem.');
      return;
    }
    try {
      await api.post('/clientes', { nome, email, senha });
      window.location.href = '/'; // Redirecionamento após o cadastro
    } catch (error) {
      setError('Erro ao cadastrar. Por favor, tente novamente.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={10} p={4} borderRadius={8} bgcolor="#f0f0f0" boxShadow={5}>
        <Typography variant="h4" align="center" gutterBottom style={{ color: '#324679', background: '#e0e0e0', padding: '10px', borderRadius: '8px', fontFamily: 'Roboto', fontWeight: 'bold' }}>
          Biblioteca Online
        </Typography>
        <Typography variant="h5" align="center" gutterBottom style={{ color: '#324679', fontFamily: 'Roboto', fontWeight: 'bold' }}>
          Cadastro
        </Typography>
        <TextField
          label="Nome"
          variant="outlined"
          fullWidth
          margin="normal"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Senha"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        <TextField
          label="Confirmar Senha"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={confirmarSenha}
          onChange={(e) => setConfirmarSenha(e.target.value)}
        />
        {error && <Typography variant="body2" color="error">{error}</Typography>}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleCadastro}
          sx={{
            backgroundColor: '#324679',
            marginTop: '16px',
            '&:hover': {
              backgroundColor: '#293e56', // Cor de fundo no hover
            },
          }}
        >
          Cadastrar
        </Button>
        <Typography variant="body2" align="center" style={{ marginTop: '16px', fontFamily: 'Roboto', fontWeight: 'bold' }}>
          Já tem uma conta? <Link to="/" style={{ color: '#324679' }}>Faça Login</Link>
        </Typography>
      </Box>
    </Container>
  );
}

export default Cadastro;
