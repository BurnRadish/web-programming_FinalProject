const { generateToken } = require("../utils/token")
const { isLoggedIn } = require('../middlewares')
const Joi = require('joi')
const pool = require("../config")
const express = require("express")
const router = express.Router();

const loginSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
})
router.post('/user/login', async (req, res, next) => {
    try {
        await loginSchema.validateAsync(req.body, { abortEarly: false })
    } catch (err) {
        return res.status(400).send(err)
    }
    const username = req.body.username
    const password = req.body.password

    const conn = await pool.getConnection()
    await conn.beginTransaction()
    try {
        const [users] = await conn.query('SELECT * FROM employee WHERE username=?', [username])
        const user = users[0]
        if (!user){
            throw new Error('Incorrect username or password')
        }
        if (!(await password === user.password)){
            throw new Error('Incorrect username or password')
        }
        const [tokens] = await conn.query('SELECT * FROM tokens WHERE user_id=?', [user.emp_id])
        let token = tokens[0]?.token
        if (!token){
            token = generateToken()
            await conn.query('INSERT INTO tokens(user_id, token) VALUES (?, ?)', [user.emp_id, token])
        }
        conn.commit()
        res.status(200).json({'token': token})
    } catch (err) {
        conn.rollback()
        res.status(400).json(err.toString())
    } finally {
        conn.release()
    }
})

router.get('/user/me', isLoggedIn, async (req, res, next) => {
    res.json(req.user)
})
exports.router = router