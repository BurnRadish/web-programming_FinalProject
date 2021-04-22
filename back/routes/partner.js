const express = require("express");
const path = require("path")
const pool = require("../config");
const router = express.Router();

//get all partner details
router.get("/partner", async function(req, res, next) {
    const conn = await pool.getConnection()
    await conn.beginTransaction();
    try {
        let info = await conn.query("SELECT * FROM partner")
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

//get partner details
router.get("/partner/:id", async function(req, res, next) {
    const conn = await pool.getConnection()
    await conn.beginTransaction();
    try {
        let info = await conn.query("SELECT * FROM partner WHERE par_id = ?", [req.params.id])
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

//add partner
router.post("/partner", async function(req, res, next) {
    const conn = await pool.getConnection()
    await conn.beginTransaction();
    let deliverly_address = req.body.delivery_address
    let company_name = req.body.company_name
    let par_fname = req.body.par_fname
    let par_lname = req.body.par_lname
    let legal_address = req.body.legal_address
    let type = req.body.type
    let email1 = req.body.email1
    let email2 = req.body.email2
    let phone1 = req.body.phone1
    let phone2 = req.body.phone2
    let description = req.body.description
    try {
        let edit = await conn.query(`
        INSERT INTO partner(delivery_address, company_name, par_fname, par_lname, legal_address, type, email1, email2, phone1, phone2, description)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [deliverly_address, company_name, par_fname, par_lname, legal_address, type, email1, email2, phone1, phone2, description])
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

//delete partner 
router.delete("/partner/:id", async function(req, res, next) {
    const conn = await pool.getConnection()
    await conn.beginTransaction();
    try {
        await conn.query('SET FOREIGN_KEY_CHECKS = 0;')
        await conn.query('DELETE FROM partner WHERE par_id = ?', [req.params.id])
        await conn.query('SET FOREIGN_KEY_CHECKS = 1;')
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

//edit partner detail
router.put("/partner/:id", async function(req, res, next) {
    const conn = await pool.getConnection()
    await conn.beginTransaction();
    let delivery_address = req.body.delivery_address
    let company_name = req.body.company_name
    let fname = req.body.par_fname
    let lname = req.body.par_lname
    let legal_address = req.body.legal_address
    let phone1 = req.body.phone1
    let phone2 = req.body.phone2
    let email1 = req.body.email1
    let email2 = req.body.email2
    try {
        await conn.query('SET FOREIGN_KEY_CHECKS = 0;')
        await conn.query(`
        UPDATE partner 
        SET delivery_address = ?,
            company_name = ?,
            par_fname = ?,
            par_lname = ?,
            legal_address = ?,
            phone1 = ?,
            phone2 = ?,
            email1 = ?,
            email2 = ? 
        WHERE par_id = ?`,[delivery_address, company_name, fname, lname, legal_address, phone1, phone2, email1, email2, req.params.id])
        await conn.query('SET FOREIGN_KEY_CHECKS = 1;')
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