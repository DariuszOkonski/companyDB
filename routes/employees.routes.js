const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');

router.get('/employees', (req, res) => {
  req.db
    .collection('employees')
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
  req.db
    .collection('employees')
    .aggregate([{ $sample: { size: 1 } }])
    .toArray()
    .then((data) => {
      return res.json(data[0]);
    })
    .catch((err) => {
      return res.status(500).json({ message: err });
    });
});

router.get('/employees/:id', (req, res) => {
  req.db
    .collection('employees')
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

  req.db
    .collection('employees')
    .insertOne({ firstName, lastName })
    .then(() => {
      return res.json({ message: 'OK' });
    })
    .catch((err) => {
      return res.status(500).json({ message: err });
    });
});

router.put('/employees/:id', (req, res) => {
  const { firstName, lastName } = req.body;

  if (!firstName || !lastName) {
    return res.status(400).json({ error: 'Missing required data in request' });
  }

  req.db
    .collection('employees')
    .updateOne(
      { _id: ObjectId(req.params.id) },
      { $set: { firstName, lastName } }
    )
    .then(() => {
      return res.json({ message: 'OK' });
    })
    .catch((err) => {
      return res.status(500).json({ message: err });
    });
});

router.delete('/employees/:id', (req, res) => {
  req.db
    .collection('employees')
    .deleteOne({ _id: ObjectId(req.params.id) })
    .then(() => {
      return res.json({ message: 'OK' });
    })
    .catch((err) => {
      return res.status(500).json({ message: err });
    });
});

module.exports = router;
