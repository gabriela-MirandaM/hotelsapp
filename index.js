const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());

// Configura la conexión a la base de datos
const connection = mysql.createConnection({
  host: 'localhost', // Cambia esto por tu host de MySQL
  user: 'root',      // Cambia esto por tu usuario de MySQL
  password: '',      // Cambia esto por tu contraseña de MySQL
  database: 'hotelsdb' // Cambia esto por el nombre de tu base de datos
});

connection.connect(err => {
  if (err) throw err;
  console.log('Connected to the database.');
});

// Endpoint para registrar reservas
app.post('/reservations', (req, res) => {
  const { names, phone, email, id_hotel, people, date_admission, departure_date, price_total, status, comments } = req.body;
  const query = 'INSERT INTO reservations (names, phone, email, id_hotel, people, date_admission, departure_date, price_total, status, comments) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  connection.query(query, [names, phone, email, id_hotel, people, date_admission, departure_date, price_total, status, comments], (err, results) => {
    if (err) return res.status(500).send(err);
    res.status(201).json({ id: results.insertId });
  });
});

// Endpoint para actualizar el estado de la reserva
app.put('/reservations/:id', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const query = 'UPDATE reservations SET status = ? WHERE id = ?';
  connection.query(query, [status, id], (err, results) => {
    if (err) return res.status(500).send(err);
    res.status(200).json({ affectedRows: results.affectedRows });
  });
});

// Endpoint para listar las reservas
app.get('/reservations', (req, res) => {
  const query = 'SELECT * FROM reservations';
  connection.query(query, (err, results) => {
    if (err) return res.status(500).send(err);
    res.status(200).json(results);
  });
});

// Endpoint para listar los hoteles
app.get('/hotels', (req, res) => {
  const query = 'SELECT * FROM hotels';
  connection.query(query, (err, results) => {
    if (err) return res.status(500).send(err);
    res.status(200).json(results);
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
