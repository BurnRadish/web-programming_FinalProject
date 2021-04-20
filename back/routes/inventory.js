const express = require("express");
const path = require("path")
const pool = require("../config");
const router = express.Router();

//get all item information
router.get("/products", async function(req, res, next) {
    const conn = await pool.getConnection()
    await conn.beginTransaction();
    try {
        let info = await conn.query(`
        SELECT * FROM product p
        JOIN product_transaction pt
        ON p.pro_id = pt.product_pro_id
        `
        )
        conn.commit()
        res.send(info[0]);
    } catch (err) {
        await conn.rollback();
        return next(err)
    } finally {
        console.log('*-----END-----*')
        conn.release();
    }
});

//get product details
router.get("/products/:id", async function(req, res, next) {
    const conn = await pool.getConnection()
    await conn.beginTransaction();
    try {
        let info = await conn.query(`
        SELECT * FROM product p
        JOIN product_transaction pt
        ON p.pro_id = pt.product_pro_id
        WHERE pro_id = ?
        `
        , [req.params.id])
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


exports.router = router;