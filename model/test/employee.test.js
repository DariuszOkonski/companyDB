const { expect } = require('chai');
const Employee = require('../department.model.js');
const mongoose = require('mongoose');

describe('Employee', () => {
  after(() => {
    mongoose.model = {};
  });

  it('should throw an error if no firstName, lastName or department arg', () => {
    const employee = new Employee({});

    employee.validateSync((err) => {
      expect(err.errors.name).to.exist;
    });
  });
});
