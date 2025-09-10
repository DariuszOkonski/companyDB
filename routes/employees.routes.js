const express = require('express');
const router = express.Router();
const db = require('./../db');
const { ObjectId } = require('mongodb');

router.get('/employees', (req, res) => {
  req.db
    .collection('departments')
    .find()
    .toArray()
    .then((data) => {
      return res.json(data);
    })
    .catch((err) => {
      return res.status(500).json({ message: err });
    });
});

router.get('/employees/random', (req, res) => {
  res.json(db.employees[Math.floor(Math.random() * db.length)]);
});

router.get('/employees/:id', (req, res) => {
  req.db
    .collection('departments')
    .findOne({ _id: ObjectId(req.params.id) })
    .then((data) => {
      if (!data) {
        return res.status(404).json({ message: 'Not found' });
      }
      return res.json(data);
    })
    .catch((err) => {
      return res.status(500).json({ message: err });
    });
});

router.post('/employees', (req, res) => {
  const { firstName, lastName } = req.body;

  if (!firstName || !lastName) {
    return res.status(400).json({ error: 'Missing required data in request' });
  }

  db.employees.push({ id: 3, firstName, lastName });
  res.json({ message: 'OK' });
});

router.put('/employees/:id', (req, res) => {
  const { firstName, lastName } = req.body;
  db = db.employees.map((item) =>
    item.id == req.params.id ? { ...item, firstName, lastName } : item
  );
  res.json({ message: 'OK' });
});

router.delete('/employees/:id', (req, res) => {
  db = db.employees.filter((item) => item.id != req.params.id);
  res.json({ message: 'OK' });
});

module.exports = router;
