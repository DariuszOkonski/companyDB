const { expect } = require('chai');
const Employee = require('../department.model.js');
const mongoose = require('mongoose');

describe('Employee', () => {
  // after(() => {
  //   mongoose.model = {};
  // });

  it('should throw an error if no firstName, lastName or department arg', () => {
    const employee = new Employee({});

    employee.validateSync((err) => {
      expect(err.errors.firstName).to.exist;
      expect(err.errors.lastName).to.exist;
      expect(err.errors.department).to.exist;
    });
  });

  it('should throw an error if firstName is not a string', () => {
    const cases = [{}, []];

    for (let firstName of cases) {
      const employee = new Employee({ firstName });

      employee.validateSync((err) => {
        expect(err.errors.firstName).to.exist;
      });
    }
  });

  it('should throw an error if lastName is not a string', () => {
    const cases = [{}, []];

    for (let lastName of cases) {
      const employee = new Employee({ lastName });

      employee.validateSync((err) => {
        expect(err.errors.lastName).to.exist;
      });
    }
  });

  it('should throw an error if department is not a string', () => {
    const cases = [{}, []];

    for (let department of cases) {
      const employee = new Employee({ department });

      employee.validateSync((err) => {
        expect(err.errors.department).to.exist;
      });
    }
  });

  it('should not throw an error if firstName ist String', () => {
    const cases = ['John', 'Amanda'];

    for (let firstName of cases) {
      const employee = new Employee({ firstName });

      employee.validateSync((err) => {
        expect(err.errors.firstName).to.not.exist;
      });
    }
  });

  it('should not throw an error if lastName ist String', () => {
    const cases = ['Doe', 'Deer'];

    for (let lastName of cases) {
      const employee = new Employee({ lastName });

      employee.validateSync((err) => {
        expect(err.errors.lastName).to.not.exist;
      });
    }
  });

  it('should not throw an error if department ist String', () => {
    const cases = ['68c8ee095bcf41d59291daa5', '68c8ee425bcf41d59291daa6'];

    for (let department of cases) {
      const employee = new Employee({ department });

      employee.validateSync((err) => {
        expect(err.errors.department).to.not.exist;
      });
    }
  });
});
