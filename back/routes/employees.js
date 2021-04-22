const express = require("express");
const path = require("path")
const pool = require("../config");
const router = express.Router();

//get all member details
router.get("/employees", async function(req, res, next) {
    const conn = await pool.getConnection()
    await conn.beginTransaction();
    try {
        let info = await conn.query("SELECT * FROM employee")
        conn.commit()
        //res.send(info[0]);
        res.json({
            blogs : info[0]
        })
    } catch (err) {
        await conn.rollback();
        return next(err)
    } finally {
        console.log('*-----END-----*')
        conn.release();
    }
});

//get member details
router.get("/employees/:id", async function(req, res, next) {
    const conn = await pool.getConnection()
    await conn.beginTransaction();
    try {
        let info = await conn.query("SELECT * FROM employee WHERE emp_id = ?", [req.params.id])
        conn.commit()
        res.send(info[0][0]);
    } catch (err) {
        await conn.rollback();
        return next(err)
    } finally {
        console.log('finally')
        conn.release();
    }
});

//add member
router.post("/employees", async function(req, res, next) {
    const conn = await pool.getConnection()
    await conn.beginTransaction();
    let citizen = req.body.citizen
    let degree = req.body.degree
    let dob = req.body.dob
    let pos = req.body.position
    let sal = req.body.salary
    let address = req.body.address
    let email = req.body.email
    let phone = req.body.phone
    let fname = req.body.fname
    let lname = req.body.lname
    let gender = req.body.gender
    let username = req.body.username
    let pass = req.body.password
    try {
        let edit = await conn.query(`
        INSERT INTO employee(citizen_id, degree, dob, position, salary, address, email, phone, fname, lname, gender, username, password)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [citizen, degree, dob, pos, sal, address, email, phone, fname, lname, gender, username, pass])
        conn.commit()
        res.send('Success!');
    } catch (err) {
        await conn.rollback();
        return next(err)
    } finally {
        console.log('finally')
        conn.release();
    }
});

//delete member 
router.delete("/employees/:id", async function(req, res, next) {
    const conn = await pool.getConnection()
    await conn.beginTransaction();
    try {
        let edit = await conn.query('DELETE FROM employee WHERE emp_id = ?', [req.params.id])
        conn.commit()
        res.send('Success!');
    } catch (err) {
        await conn.rollback();
        return next(err)
    } finally {
        console.log('finally')
        conn.release();
    }
});

//edit member detail
router.put("/employees/:id", async function(req, res, next) {
    const conn = await pool.getConnection()
    await conn.beginTransaction();
    let degree = req.body.degree
    let pos = req.body.position
    let sal = req.body.salary
    let address = req.body.address
    let email = req.body.email
    let phone = req.body.phone
    let fname = req.body.fname
    let lname = req.body.lname
    try {
        await conn.query(`
        UPDATE employee 
        SET degree = ?,
            position = ?,
            salary = ?,
            address = ?,
            email = ?,
            phone = ?,
            fname = ?,
            lname = ? 
        WHERE emp_id = ?`,[degree, pos, sal, address, email, phone, fname, lname, req.params.id])
        conn.commit()
        res.send('Success!');
    } catch (err) {
        await conn.rollback();
        return next(err)
    } finally {
        console.log('*-----END-----*')
        conn.release();
    }
});

//edit password
router.put("/employees/:id/password", async function(req, res, next) {
    const conn = await pool.getConnection()
    await conn.beginTransaction();
    try {
        await conn.query(`
        UPDATE employee 
        SET password = ?
        WHERE emp_id = ?`,[req.body.password, req.params.id])
        conn.commit()
        res.send('Success!');
    } catch (err) {
        await conn.rollback();
        return next(err)
    } finally {
        console.log('*-----END-----*')
        conn.release();
    }
});

exports.router = router;