const Employee = require('../employee.model');
const { expect } = require('chai');
const mongoose = require('mongoose');

describe('Employee', () => {
  before(async () => {
    try {
      await mongoose.connect('mongodb://0.0.0.0:27017/companyDBtest', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    } catch (err) {
      console.error(err);
    }
  });

  after(() => {
    mongoose.models = {};
  });

  describe('Reading data', () => {
    before(async () => {
      const testDepOne = new Employee({
        firstName: 'John',
        lastName: 'Doe',
        department: '68bd788812a2d1ab0ddd569f',
      });
      await testDepOne.save();

      const testDepTwo = new Employee({
        firstName: 'Amanda',
        lastName: 'Doe',
        department: '68c10776f7b18cebe5b78c70',
      });
      await testDepTwo.save();
    });

    after(async () => {
      await Employee.deleteMany();
    });

    it('should return all the data with find method', async () => {
      const employees = await Employee.find();
      expect(employees.length).to.be.equal(2);
    });

    it('should return proper document by various params with findOne method', async () => {
      const employee = await Employee.findOne({ firstName: 'John' });
      expect(employee.firstName).to.be.equal('John');
    });
  });

  describe('Creating data', () => {
    after(async () => {
      await Employee.deleteMany();
    });

    it('should insert new document with insertOne method', async () => {
      const employee = new Employee({
        firstName: 'John',
        lastName: 'Doe',
        department: '68c10776f7b18cebe5b78c70',
      });
      employee.save();

      const savedEmployee = Employee.findOne({ firstName: 'John' });
      expect(savedEmployee).to.not.be.null;
    });
  });
});
