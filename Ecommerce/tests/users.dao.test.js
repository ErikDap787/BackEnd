/*import mongoose from 'mongoose'
import User from '../src/dao/Users.dao.js'
import Assert from 'assert'

mongoose.connect('mongodb://localhost:27017')
const assert = Assert.strict

describe('Testing User DAO', () => {
    before(async function() {
        this.mockUser = {
            first_name: 'Alex',
            last_name: 'Marin',
            email: 'alexmarinmendez@gmail.com',
            password: 'secret'
        }
        this.userDao = new User()
        await mongoose.connection.collections.users.drop()
    })
    it('El GET debe devolver un arreglo', async function() {
        const result = await this.userDao.get()
        assert.strictEqual(Array.isArray(result), true)
    })
    it('El GET debe devolver un array vacío', async function() {
        const result = await this.userDao.get()
        assert.strictEqual(result.length, 0)
    })
    it('El dao debe poder crear usuarios', async function() {
        const result = await this.userDao.save(this.mockUser)
        assert.ok(result._id)
    })
    it('EL dao debe poder bucar por email', async function() {
        await this.userDao.save(this.mockUser)
        const user = await this.userDao.getBy({ email: 'alexmarinmendez@gmail.com' })
        assert.strictEqual(typeof user, 'object')
    })  
}) */
