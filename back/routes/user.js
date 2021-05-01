const express = require("express");
const pool = require("../config");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/token");
const router = express.Router();

router.post("/user/signup", async (req, res, next) => {
  // ...
});

const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

router.post("/user/login", async (req, res, next) => {
  try {
    await loginSchema.validateAsync(req.body, { abortEarly: false });
  } catch (err) {
    return res.status(400).send(err);
  }
  const username = req.body.username;
  const password = req.body.password;

  const conn = await pool.getConnection();
  await conn.beginTransaction();

  try {
    // Check if username is correct
    const [users] = await conn.query("SELECT * FROM employee WHERE username=?", [
      username,
    ]);
    const user = users[0];
    if (!user) {
      throw new Error("Incorrect username or password");
    }

    // Check if password is correct
    if (! await password ==  user.password) {
      throw new Error("Incorrect username or password");
    }

    // Check if token already existed
    const [tokens] = await conn.query("SELECT * FROM tokens WHERE user_id=?", [
      user.id,
    ]);
    let token = tokens[0]?.token;
    if (!token) {
      // Generate and save token into database
      token = generateToken();
      await conn.query("INSERT INTO tokens(user_id, token) VALUES (?, ?)", [
        user.emp_id,
        token,
      ]);
    }

    conn.commit();
    res.status(200).json({ token: token });
  } catch (error) {
    conn.rollback();
    res.status(400).json(error.toString());
  } finally {
    conn.release();
  }
});

exports.router = router;
