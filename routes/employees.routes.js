const express = require('express');
const router = express.Router();
const Employee = require('../model/employee.model');
const mongoose = require('mongoose');

router.get('/employees', async (req, res) => {
  try {
    const employees = await Employee.find();
    return res.json(employees);
  } catch (error) {
    return res.status(500).json({ message: err });
  }
});

router.get('/employees/random', async (req, res) => {
  try {
    const count = await Employee.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const employee = await Employee.findOne().skip(rand);

    if (!employee) {
      return res.status(404).json({ msg: 'Not found' });
    }

    return res.json(employee);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

router.get('/employees/:id', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid department ID' });
    }

    const employee = await Employee.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({ message: 'Not Found' });
    }

    return res.json(employee);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
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
