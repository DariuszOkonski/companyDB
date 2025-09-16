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

// mongoose.connect('mongodb://0.0.0.0:27017/companyDB', {
mongoose.connect(
  'mongodb+srv://darek200180_db_user:J2JOckPwXfY2vN2U@companydb.y6rjd6d.mongodb.net/?retryWrites=true&w=majority&appName=companyDB',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
const db = mongoose.connection;
db.once('open', () => {
  console.log('Connected to the database...');
});
db.on('error', (err) => console.log('Error ' + err));

app.listen('8000', () => {
  console.log('Server is running on port: 8000...');
});
