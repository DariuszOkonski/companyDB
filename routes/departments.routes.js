const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');
const Department = require('../model/department.model');

router.get('/departments', (req, res) => {
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

router.get('/departments/random', (req, res) => {
  req.db
    .collection('departments')
    .aggregate([{ $sample: { size: 1 } }])
    .toArray()
    .then((data) => {
      return res.json(data[0]);
    })
    .catch((err) => {
      return res.status(500).json({ message: err });
    });
});

router.get('/departments/:id', (req, res) => {
  req.db
    .collection('departments')
    .findOne({ _id: ObjectId(req.params.id) })
    .then((data) => {
      if (!data) return res.status(404).json({ message: 'Not found' });
      else return res.json(data);
    })
    .catch((err) => {
      return res.status(500).json({ message: err });
    });
});

router.post('/departments', async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Missing data' });
    }

    const newDepartment = new Department({ name });
    await newDepartment.save();
    return res.json({ message: 'OK' });
  } catch (error) {
    return res.status(500).json({ message: err });
  }
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
