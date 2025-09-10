const express = require('express');
const router = express.Router();
const db = require('./../db');
const { ObjectId } = require('mongodb');

router.get('/departments', (req, res) => {
  return req.db
    .collection('departments')
    .find()
    .toArray()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
});

router.get('/departments/random', (req, res) => {
  res.json(db.departments[Math.floor(Math.random() * db.length)]);
});

router.get('/departments/:id', (req, res) => {
  return req.db
    .collection('departments')
    .findOne({ _id: ObjectId(req.params.id) })
    .then((data) => {
      if (!data) res.status(404).json({ message: 'Not found' });
      else res.json(data);
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
});

router.post('/departments', (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Missing data' });
  }

  return req.db
    .collection('departments')
    .insertOne({ name: name })
    .then(() => {
      res.json({ message: 'OK' });
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
});

router.put('/departments/:id', (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Missing data' });
  }

  req.db
    .collection('departments')
    .updateOne({ _id: ObjectId(req.params.id) }, { $set: { name: name } })
    .then(() => {
      return res.json({ message: 'OK' });
    })
    .catch((err) => {
      return res.status(500).json({ message: err });
    });
});

router.delete('/departments/:id', (req, res) => {
  req.db
    .collection('departments')
    .deleteOne({ _id: ObjectId(req.params.id) })
    .then(() => {
      return res.json({ message: 'OK' });
    })
    .catch((err) => {
      return res.status(500).json({ message: err });
    });
});

module.exports = router;
