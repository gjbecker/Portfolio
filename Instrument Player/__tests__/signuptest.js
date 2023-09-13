const mongoose = require('mongoose');
const UserModel = require('../models/user');
const userData = { name: 'John Smith', email: 'john.smith@iastate.edu', username: 'jsmith', password: 'password123' };

describe('User Model Test', () => {
    beforeAll(async () => {
        const dbURI = 'mongodb+srv://instrument:' + process.env.PORT + '@cluster0.aa1wpib.mongodb.net/?retryWrites=true&w=majority'
        await mongoose.connect(dbURI).catch((err) => console.log(err))
        });

    it('create & save user to mongoDB successfully', async () => {
        const validUser = new UserModel(userData);
        const savedUser = await validUser.save();

        expect(savedUser._id).toBeDefined();
        expect(savedUser.name).toBe(userData.name);
        expect(savedUser.email).toBe(userData.email);
        expect(savedUser.username).toBe(userData.username);
        expect(savedUser.password).toBe(userData.password);
    });

    it('insert user successfully, but the field not defined in schema should be undefined', async () => {
        const userWithInvalidField = new UserModel({  name: 'John Smith', email: 'john.smith@iastate.edu', username: 'jsmith', password: 'password123', phone: '123-456-7890' });
        const savedUserWithInvalidField = await userWithInvalidField.save();
        expect(savedUserWithInvalidField._id).toBeDefined();
        expect(savedUserWithInvalidField.phone).toBeUndefined();
    });

    it('attempt to create user without required field failed', async () => {
        const userWithoutRequiredField = new UserModel({ name: 'John', email: 'john.smith@iastate.edu', username: '', password: 'password123' });
        let err;
        try {
            const savedUserWithoutRequiredField = await userWithoutRequiredField.save();
            error = savedUserWithoutRequiredField;
        } catch (error) {
            err = error
        }
        expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
        expect(err.errors.username).toBeDefined();
    });
})