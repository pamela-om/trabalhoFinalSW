import React from 'react';
import {  Card, CardContent, CardMedia, Typography } from '@mui/material';

function CardBook({ titulo, autor, genero, anoPublicacao, imagem }) {
  return (
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
    </Card>
  );
}

export default CardBook;
