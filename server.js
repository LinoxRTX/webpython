const express = require('express');
const mysql = require('mysql2/promise');
const path = require('path');
const app = express();
const PORT = 2999;
const dbConfig = {
  host: process.env.DB_HOST || 'db',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME || 'webpython',
  port: 3306
};
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.get('/ping-db', async (req, res) => {
  let connection;
  try {
    console.log('Intentando conectar a la BD...');
    connection = await mysql.createConnection(dbConfig);
    console.log('¡Conexión exitosa!');
    res.json({ success: true, message: 'Conexión a MariaDB exitosa.' });
  } catch (error) {
    console.error('Error al conectar a la BD:', error.message);
    res.status(500).json({ success: false, message: 'Error al conectar a la BD.' });
  } finally {
    if (connection) await connection.end();
  }
});
app.listen(PORT, () => {
  console.log(`Servidor Node.js corriendo en http://localhost:${PORT}`);
  console.log(`Host de la BD: ${dbConfig.host}`);
});