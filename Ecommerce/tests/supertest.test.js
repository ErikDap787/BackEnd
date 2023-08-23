/*

import chai from 'chai'
import supertest from 'supertest'
import { faker } from '@faker-js/faker'

const expect = chai.expect
const requester = supertest('http://localhost:8080')

describe('Test de /api/pets', () => {
    it('El Endpoint POST /api/pets debe registrar una mascota', async () => {
        const petMock = {
            name: 'Firulais',
            specie: 'dog',
            birthDate: '10-10-2020'
        }
        const response = await requester.post('/api/pets').send(petMock)
        const { status, ok, _body } = response

        // console.log(status)
        // console.log(ok)
        // console.log(_body)
        expect(_body.payload).to.have.property('_id')
    })
    it('El Endpoint POST /api/pets no debería crear mascotas con datos vacíos', async() => {
        const response = await requester.post('/api/pets').send({})
        const { status, ok, _body } = response
        expect(ok).to.be.eq(false)
    })
})

describe('Test de /api/sessions', () => {
    let cookie
    const mockUser = {
        first_name: 'Maximo',
        last_name: 'Lorenzo',
        email: faker.internet.email(),
        password: 'secret'
    }

    it('Debe registrar un usuario', async() => {
        const { _body } = await requester.post('/api/sessions/register').send(mockUser)
        expect(_body.payload).to.be.ok
    })

    it('Debe logear un user y DEVOLVER UNA COOKIE', async() => {
        const result = await requester.post('/api/sessions/login').send({
            email: mockUser.email,
            password: mockUser.password
        })

        const cookieResult = result.headers['set-cookie'][0]
        expect(cookieResult).to.be.ok

        //cookieResult = 'COOKIE_NAME=COOKIE_VALUE'
        cookie = {
            name: cookieResult.split('=')[0],
            value: cookieResult.split('=')[1]
        }
        expect(cookie.name).to.be.ok.and.eql('coderCookie')
        expect(cookie.value).to.be.ok
    })

    it('Enviar cookie para ver el contenido del user', async() => {
        const { _body } = await requester.get('/api/sessions/current').set('Cookie', [`${cookie.name}=${cookie.value}`])
        expect(_body.payload.email).to.be.eql(mockUser.email)
    })
})

describe('Test upload file', () => {
    it('debe subir un archivo al crear un pet', async() => {
        const petMock = {
            name: 'Firulais',
            specie: 'dog',
            birthDate: '10-10-2020'
        }

        const result = await requester.post('/api/pets/withimage')
            .field('name', petMock.name)
            .field('specie', petMock.specie)
            .field('birthDate', petMock.birthDate)
            .attach('image', './test/foto.jpg')

        expect(result.status).to.be.eql(200)
        expect(result._body.payload).to.have.property('_id')
        expect(result._body.payload.image).to.be.ok
    })
})

*/
