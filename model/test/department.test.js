// const { describe, it } = require('mocha');
const { expect } = require('chai');
const Department = require('../department.model.js');
const mongoose = require('mongoose');

describe('Department', () => {
  after(() => {
    mongoose.model = {};
  });

  it('should throw an error if no name arg', () => {
    const department = new Department({});

    department.validateSync((err) => {
      expect(err.errors.name).to.exist;
    });
  });

  it('should throw an error if name is not a string', () => {
    const cases = [{}, []];
    for (let name of cases) {
      const dep = new Department({ name });

      dep.validateSync((err) => {
        expect(err.errors.name).to.exist;
      });
    }
  });

  it('should throw an error if name is to short or too long', () => {
    const cases = ['Abc', 'abcd', 'Lorem Ipsum, Lorem Ip'];

    for (let name of cases) {
      const dep = new Department({ name });

      dep.validateSync((err) => {
        expect(err.errors.name).to.exist;
      });
    }
  });

  it('should not throw an error if name is okay', () => {
    const cases = ['Management', 'Human Resources'];

    for (let name of cases) {
      const dep = new Department({ name });

      dep.validateSync((err) => {
        expect(err).to.not.exist;
      });
    }
  });
});
