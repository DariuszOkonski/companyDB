// post.routes.js

const express = require('express');
const router = express.Router();
const db = require('./../db');
const { ObjectId } = require('mongodb');

router.get('/products', (req, res) => {
  req.db
    .collection('products')
    .find()
    .toArray()
    .then((data) => {
      return res.json(data);
    })
    .catch((err) => {
      return res.status(500).json({ message: err });
    });
});

router.get('/products/random', (req, res) => {
  req.db
    .collection('products')
    .aggregate([{ $sample: { size: 1 } }])
    .toArray()
    .then((data) => {
      return res.json(data[0]);
    })
    .catch((err) => {
      return res.status(500).json({ message: err });
    });
});

router.get('/products/:id', (req, res) => {
  req.db
    .collection('products')
    .findOne({ _id: ObjectId(req.params.id) })
    .then((data) => {
      if (!data) return res.status(404).json({ message: 'Not found' });
      else return res.json(data);
    })
    .catch((err) => {
      return res.status(500).json({ message: err });
    });
});

router.post('/products', (req, res) => {
  const { name, client } = req.body;
  db.products.push({ id: 3, name, client });
  res.json({ message: 'OK' });
});

router.put('/products/:id', (req, res) => {
  const { name, client } = req.body;
  db = db.products.map((item) =>
    item.id == req.params.id ? { ...item, name, client } : item
  );
  res.json({ message: 'OK' });
});

router.delete('/products/:id', (req, res) => {
  db = db.products.filter((item) => item.id != req.params.id);
  res.json({ message: 'OK' });
});

module.exports = router;
