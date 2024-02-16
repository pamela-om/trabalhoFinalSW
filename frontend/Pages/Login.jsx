import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, TextField, Button, Box } from '@mui/material';
import api from '../Services/api';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await api.post('/clientes/login', { email, senha }); { email, senha };
      const { token } = response.data;
      localStorage.setItem('token', token); 
      window.location.href = '/paginaPrincipal'; 
    } catch (error) {
      setError('Credenciais inválidas. Por favor, tente novamente.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={10} p={4} borderRadius={8} bgcolor="#f0f0f0" boxShadow={5}>
        <Typography variant="h4" align="center" gutterBottom style={{ color: '#324679', background: '#e0e0e0', padding: '10px', borderRadius: '8px', fontFamily: 'Roboto', fontWeight: 'bold' }}>
          Biblioteca Online
        </Typography>
        <Typography variant="h5" align="center" gutterBottom style={{ color: '#324679', fontFamily: 'Roboto', fontWeight: 'bold' }}>
          Faça Login
        </Typography>
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
        {error && <Typography variant="body2" color="error">{error}</Typography>}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleLogin}
          sx={{
            backgroundColor: '#324679',
            marginTop: '16px',
            '&:hover': {
              backgroundColor: '#293e56',
            },
          }}
        >
          Login
        </Button>
        <Typography variant="body2" align="center" style={{ marginTop: '16px', fontFamily: 'Roboto', fontWeight: 'bold' }}>
          Não tem uma conta? <Link to="/cadastro" style={{ color: '#324679' }}>Cadastre-se</Link>
        </Typography>
      </Box>
    </Container>
  );
}

export default Login;
