/*import { Router } from 'express'
import { authToken, generateToken } from '../utils.js'
import passport from 'passport'

const router = Router()
const users = [
    { email: 'coder@coder.com', password: 'secret', role: 'admin' }
]

EL USERS CONSULTARIA A LA BD NO A UN ARRAY

router.post('/login', (req, res) => {
    const { email, password } = req.body
    const user = users.find(item => item.email === email && item.password === password)

    AQUI PASSWORD DEBERIA ESTAR HASHEADA, ENTONCES BUSCARIAMOS PRIMERO SOLO POR USUARIO, Y TRAS HABER COMPROBADO
QUE EXISTE, COMPROBARIAMOS QUE LA PASSWORD ES CORRECTA

    if (!user) return res.status(400).json({ error: 'Invalid credentials' })
    const access_token = generateToken(user)
    res.cookie('myCookieForToken', access_token).json({ status: 'success' })
})

router.get('/private', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({ status: 'success', payload: req.user })
})

export default router*/
