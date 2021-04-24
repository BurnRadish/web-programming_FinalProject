const express = require("express");
const path = require("path")
const pool = require("../config");
const router = express.Router();

//add new transaction
router.put("/trans", async function(req, res, next) {
    const conn = await pool.getConnection()
    await conn.beginTransaction();
    let delivery_date = req.body.delivery_date
    let credit = req.body.credit
    let payament_method = req.body.payment_medthod
    //payament_method = payament_method.toUpperCase()
    let payament_status = req.body.payament_status
    //payament_status = payament_status.toUpperCase()
    let credit_due_date = req.body.credit_due_date
    let transaction_date = req.body.transaction_date
    let delivery_status = req.body.delivery_status
    let type = req.body.type
    //type = type.toUpperCase()
    let employee_emp_id = req.body.employee_emp_id
    let partner_par_id = req.body.partner_par_id
    let price = req.body.price
    let count = req.body.count
    let title = req.body.title
    try {
        await conn.query('SET GLOBAL FOREIGN_KEY_CHECKS=0;')
        await conn.query(`
            INSERT INTO transaction(
                delivery_date, 
                credit, 
                payment_method, 
                payment_status, 
                credit_due_date, 
                transaction_date, 
                delivery_status, 
                type ,
                employee_emp_id, 
                partner_par_id)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `, [delivery_date, 
                credit, 
                payament_method, 
                payament_status, 
                credit_due_date, 
                transaction_date, 
                delivery_status, 
                type , 
                employee_emp_id, 
                partner_par_id])
        let tran_id = await conn.query('SELECT tran_id FROM transaction ORDER BY tran_id DESC LIMIT 1')
        let pro_id = await conn.query('SELECT pro_id FROM product WHERE title = ?', [title])
        let trann_id = await tran_id[0][0].tran_id
        let proo_id = await pro_id[0][0].pro_id
        //type = type.toUpperCase()
        if(type === 'PURCHASE'){
            await conn.query(`
                INSERT INTO product_transaction(product_pro_id, transaction_tran_id, price, count)
                VALUES (?, ?, ?, ?)
                `, [proo_id, trann_id, price, count])
            let currentAmount = await conn.query('SELECT amount FROM product WHERE title = ?', [title])
            currentAmount = parseInt(currentAmount[0][0].amount) + parseInt(count)
            await conn.query(`
                UPDATE product
                SET amount = ?
                WHERE title = ?
                `, [currentAmount, title])
        } else {
            await conn.query(`
                INSERT INTO product_transaction(product_pro_id, transaction_tran_id, price, count)
                VALUES (?, ?, ?, ?)
                `, [proo_id, trann_id, price, count])
            let currentAmount = await conn.query('SELECT amount FROM product WHERE title = ?', [title])
            currentAmount = parseInt(currentAmount[0][0].amount) - parseInt(count)
            if(currentAmount <= 0){
                currentAmount = 0
            }
            await conn.query(`
                UPDATE product
                SET amount = ?
                WHERE title = ?
                `, [currentAmount, title])
        }
        await conn.query('SET GLOBAL FOREIGN_KEY_CHECKS=1;')
        conn.commit()
        res.send('Success!')
    } catch (err) {
        await conn.rollback();
        return next(err)
    } finally {
        console.log('*-----END-----*')
        conn.release();
    }
});

//get all transaction or search transation
router.get("/trans", async function(req, res, next) {
    const conn = await pool.getConnection()
    await conn.beginTransaction();
    let search = req.query.search || ''
    try {
        /* ยิง Postman ด้วย param ผ่านแล้ว!!! */
        if(search.length > 0){
            let sql = `SELECT * FROM transaction WHERE tran_id LIKE ? OR type LIKE ? OR payment_method LIKE ? OR payment_status LIKE ?`
            let cond = [`%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`]
            let info = await pool.query(sql, cond);
            res.json({
                info : info[0]
            })
        } else {
            let info = await conn.query("SELECT * FROM transaction")
            conn.commit()
            res.send(info[0])
        }

    } catch (err) {
        await conn.rollback();
        return next(err)
    } finally {
        console.log('*-----END-----*')
        conn.release();
    }
});

//get transaction details
router.get("/trans/:id", async function(req, res, next) {
    const conn = await pool.getConnection()
    await conn.beginTransaction();
    try {
        let info = await conn.query("SELECT * FROM transaction WHERE tran_id = ?", [req.params.id])
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
exports.router = router;