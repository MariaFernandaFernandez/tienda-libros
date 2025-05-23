const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Servir los archivos estáticos del frontend
app.use(express.static(path.join(__dirname, '../Frontend')));

// Ruta para servir libros.json correctamente
app.get('/data/libros.json', (req, res) => {
  res.sendFile(path.join(__dirname, 'data', 'libros.json'));
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
