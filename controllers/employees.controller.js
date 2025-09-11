const Employee = require('../model/employee.model');
const mongoose = require('mongoose');

const getAll = async (req, res) => {
  try {
    const employees = await Employee.find().populate('department');
    return res.json(employees);
  } catch (error) {
    return res.status(500).json({ message: err });
  }
};

const getRandom = async (req, res) => {
  try {
    const count = await Employee.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const employee = await Employee.findOne().skip(rand).populate('department');

    if (!employee) {
      return res.status(404).json({ msg: 'Not found' });
    }

    return res.json(employee);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const getEmployee = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid department ID' });
    }

    const employee = await Employee.findById(req.params.id).populate(
      'department'
    );

    if (!employee) {
      return res.status(404).json({ message: 'Not Found' });
    }

    return res.json(employee);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const createEmployee = async (req, res) => {
  try {
    const { firstName, lastName, department } = req.body;

    if (!firstName || !lastName || !department) {
      return res
        .status(400)
        .json({ error: 'Missing required data in request' });
    }

    const newEmployee = new Employee({ firstName, lastName, department });
    await newEmployee.save();
    return res.json({ message: 'OK' });
  } catch (error) {
    return res.status(500).json({ message: err });
  }
};

const updateEmployee = async (req, res) => {
  try {
    const { firstName, lastName, department } = req.body;

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid department ID' });
    }

    const employee = await Employee.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({ message: 'Not Found' });
    }

    await Employee.updateOne(
      { _id: req.params.id },
      {
        $set: {
          firstName: firstName ?? employee.firstName,
          lastName: lastName ?? employee.lastName,
          department: department ?? employee.department,
        },
      }
    );

    return res.json({ message: 'OK' });
  } catch (error) {
    return res.status(500).json({ message: err });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid department ID' });
    }

    const employee = await Employee.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({ message: 'Not Found' });
    }

    await Employee.deleteOne({ _id: req.params.id });
    return res.json({ message: 'OK' });
  } catch (error) {
    return res.status(500).json({ message: err });
  }
};

module.exports = {
  getAll,
  getRandom,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
