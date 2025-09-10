// post.routes.js

const express = require('express');
const router = express.Router();
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

router.put('/products/:id', (req, res) => {
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

router.delete('/products/:id', (req, res) => {
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
