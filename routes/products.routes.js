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
  try {
    const count = await Product.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const product = await Product.findOne().skip(rand);

    if (!product) {
      return res.status(404).json({ msg: 'Not found' });
    }

    return res.json(product);
  } catch (error) {
    return res.status(500).json({ message: err });
  }
});

router.get('/products/:id', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid department ID' });
    }

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Not Found' });
    }

    return res.json(product);
  } catch (error) {
    return res.status(500).json({ message: err });
  }
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
