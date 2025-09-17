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

  describe('Updating data', () => {
    beforeEach(async () => {
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

    afterEach(async () => {
      await Employee.deleteMany();
    });

    it('should properly update one document with updateOne method', async () => {
      await Employee.updateOne(
        { firstName: 'John' },
        { $set: { firstName: '=John=' } }
      );
      const updatedEmployee = await Employee.findOne({ firstName: '=John=' });
      expect(updatedEmployee).to.not.be.null;
    });

    it('should properly update one document with save method', async () => {
      const employee = await Employee.findOne({ firstName: 'John' });
      employee.firstName = '=John=';
      await employee.save();

      const updatedEmployee = await Employee.findOne({ firstName: '=John=' });
      expect(updatedEmployee).to.not.be.null;
    });

    it('should properly update multiple documents with updateMany method', async () => {
      await Employee.updateMany({}, { $set: { firstName: 'Updated!' } });
      const employees = await Employee.find();
      expect(employees[0].firstName).to.be.equal('Updated!');
      expect(employees[1].firstName).to.be.equal('Updated!');
    });
  });

  describe('Removing data', () => {
    beforeEach(async () => {
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

    afterEach(async () => {
      await Employee.deleteMany();
    });

    it('should properly remove one document with deleteOne method', async () => {
      await Employee.deleteOne({ firstName: 'John' });
      const removedEmployee = await Employee.findOne({ firstName: 'John' });
      expect(removedEmployee).to.be.null;
    });

    it('should properly remove multiple documents with deleteMany method', async () => {
      await Employee.deleteMany();
      const employees = await Employee.find();
      expect(employees.length).to.be.equal(0);
    });
  });
});
