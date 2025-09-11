const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');
const Department = require('../model/department.model');

router.get('/departments', async (req, res) => {
  try {
    const department = await Department.find();
    return res.json(department);
  } catch (error) {
    return res.status(500).json({ message: err });
  }
});

router.get('/departments/random', async (req, res) => {
  try {
    const count = await Department.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const department = await Department.findOne().skip(rand);

    if (!department) {
      return res.status(404).json({ msg: 'Not found' });
    }

    return res.json(department);
  } catch (error) {
    return res.status(500).json({ message: err });
  }
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
