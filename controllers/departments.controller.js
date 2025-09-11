const Department = require('../model/department.model');
const mongoose = require('mongoose');

const getAll = async (req, res) => {
  try {
    const department = await Department.find();
    return res.json(department);
  } catch (error) {
    return res.status(500).json({ message: err });
  }
};

const getRandom = async (req, res) => {
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
};

const getDepartment = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid department ID' });
    }

    const department = await Department.findById(req.params.id);

    if (!department) {
      return res.status(404).json({ message: 'Not found' });
    }

    return res.json(department);
  } catch (error) {
    return res.status(500).json({ message: err });
  }
};

const createDepartment = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Missing data' });
    }

    const newDepartment = new Department({ name });
    await newDepartment.save();
    return res.json(newDepartment);
  } catch (error) {
    return res.status(500).json({ message: err });
  }
};

const updateDepartment = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Missing data' });
    }

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid department ID' });
    }
    await Department.updateOne({ _id: req.params.id }, { $set: { name } });

    const updatedDepartment = await Department.findById(req.params.id);
    return res.json(updatedDepartment);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const deleteDepartment = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid department ID' });
    }

    const department = await Department.findById(req.params.id);
    if (department) {
      await Department.deleteOne({ _id: req.params.id });
      return res.json(department);
    }

    return res.status(404).json({ message: 'Not found' });
  } catch (error) {
    return res.status(500).json({ message: err });
  }
};

module.exports = {
  getAll,
  getRandom,
  getDepartment,
  createDepartment,
  updateDepartment,
  deleteDepartment,
};
