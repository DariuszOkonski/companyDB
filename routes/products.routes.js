// post.routes.js

const express = require('express');
const router = express.Router();
const Product = require('../model/product.model');
const mongoose = require('mongoose');

router.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    return res.json(products);
  } catch (error) {
    return res.status(500).json({ message: err });
  }
});

router.get('/products/random', async (req, res) => {
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

router.get('/products/:id', async (req, res) => {
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

router.post('/products', async (req, res) => {
  const { name, client } = req.body;

  if (!name || !client) {
    return res.status(400).json({ message: 'Missing data' });
  }

  return req.db
    .collection('products')
    .insertOne({ name, client })
    .then(() => {
      return res.json({ message: 'OK' });
    })
    .catch((err) => {
      return res.status(500).json({ message: err });
    });
});

router.put('/products/:id', async (req, res) => {
  const { name, client } = req.body;

  if (!name || !client) {
    return res.status(400).json({ message: 'Missing data' });
  }

  req.db
    .collection('products')
    .updateOne({ _id: ObjectId(req.params.id) }, { $set: { name, client } })
    .then(() => {
      return res.json({ message: 'OK' });
    })
    .catch((err) => {
      return res.status(500).json({ message: err });
    });
});

router.delete('/products/:id', async (req, res) => {
  req.db
    .collection('products')
    .deleteOne({ _id: ObjectId(req.params.id) })
    .then(() => {
      return res.json({ message: 'OK' });
    })
    .catch((err) => {
      return res.status(500).json({ message: err });
    });
});

module.exports = router;
