require('dotenv').config();
const express = require('express');
const cors = require('cors');
// const mongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const app = express();

const employeesRoutes = require('./routes/employees.routes');
const departmentsRoutes = require('./routes/departments.routes');
const productsRoutes = require('./routes/products.routes');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  req.db = db;
  next();
});

app.use('/api', employeesRoutes);
app.use('/api', departmentsRoutes);
app.use('/api', productsRoutes);

app.use((req, res) => {
  res.status(404).send({ message: 'Not found...' });
});

const NODE_ENV = process.env.NODE_ENV;
let dbUri = '';

if (NODE_ENV === 'production')
  dbUri = `mongodb+srv://darek200180_db_user:${process.env.DB_PASS}@companydb.y6rjd6d.mongodb.net/?retryWrites=true&w=majority&appName=companyDB`;
else if (NODE_ENV === 'test') dbUri = 'mongodb://0.0.0.0:27017/companyDBtest';
else dbUri = 'mongodb://0.0.0.0:27017/companyDB';

console.group('MongoDB config');
console.log('dbUri: ', dbUri);
console.log('NODE_ENV: ', NODE_ENV);
console.log('process.env.DB_PASS: ', process.env.DB_PASS);
console.groupEnd();

mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.once('open', () => {
  console.log('Connected to the database...');
});
db.on('error', (err) => console.log('Error ' + err));

const server = app.listen('8000', () => {
  console.log('Server is running on port: 8000...');
});

module.exports = server;
