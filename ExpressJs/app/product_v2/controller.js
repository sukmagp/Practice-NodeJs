const connection = require('../../config/mysql');
const path = require('path');
const fs = require('fs');
const Product = require('./model');

const index = (req, res) => {
    const {search} = req.query;
    let query = {};
    if(search) {
        exec = {
            sql: 'SELECT * FROM product_v2 WHERE name LIKE ?',
            values: [`%${search}%`]
        }
    }else {
        exec = {
            sql: 'SELECT * FROM product_v2'
        }
    }
    connection.query(exec, _response(res));
};

const view = (req, res) => {
    connection.query({
        sql: 'SELECT * FROM product_v2 WHERE id = ?',
        values : [req.params.id]
    }, _response(res));
};

const store = async (req, res) => {
    const {users_id, name, price, stock, status} = req.body;
    const image = req.file;
    if(image) {
        const target = path.join(__dirname, '../../uploads', image.originalname);
        fs.renameSync(image.path, target);
        try {
            await Product.sync();
            const result = await Product.create({users_id, name, price, stock, status, image_url: `http://localhost:3030/public/${image.originalname}`});
            res.send(result);
        }catch(e) {
            res.send(e);
        }
    }
};

const update = (req, res) => {
    const {users_id, name, price, stock, status} = req.body;
    const image = req.file;
    let sql = '';
    let values = [];
    if(image) {
        const target = path.join(__dirname, '../../uploads', image.originalname);
        fs.renameSync(image.path, target);
        sql = 'UPDATE product_v2 SET users_id = ?, name = ?, price = ?, stock = ?, status = ?, image_url = ? WHERE id = ?';
        values = [parseInt(users_id), name, price, stock, status, `http://localhost:3030/public/${image.originalname}`, req.params.id]
    }else {
        sql = 'UPDATE product_v2 SET users_id = ?, name = ?, price = ?, stock = ?, status = ? WHERE id = ?'
        values = [parseInt(users_id), name, price, stock, status, req.params.id]
    }

    connection.query({sql, values}, _response(res));
};

const destroy = (req, res) => {
    connection.query({
        sql: 'DELETE FROM product_v2 WHERE id = ?',
        values : [req.params.id]
    }, _response(res));
};

const _response = (res) => {
    return (error, result) => {
        if(error) {
            res.send({
                status: 'failed',
                response: error
            });
        } else {
            res.send({
                status: 'success',
                response: result
            });
        };
    };
};

module.exports = {
    index,
    view,
    store,
    update,
    destroy
}