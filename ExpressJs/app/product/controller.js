const connection = require ('../../config/mysql');
const fs = require ('fs');
const path = require ('path');


// Search Data
const index = (req, res) => {
    const {search} = req.query;
    let exec = {};
    if (search) {
        exec = {
            sql: 'SELECT * FROM product WHERE name LIKE ?',
            values: [`%${search}%`]
        }
    } else {
        exec ={
            sql: 'SELECT * FROM product'
        }
    }
    connection.query(exec, _response(res));
}

// Read Data
const view = (req, res) => {
    connection.query({
        sql: 'SELECT * FROM product WHERE id = ?',
        values: [req.params.id]
    }, _response(res));
}

// Delete Data
const destroy = (req, res) => {
    connection.query({
        sql: 'DELETE FROM product WHERE id = ?',
        values: [req.params.id]
    }, _response(res));
}

// Creat Data
const store = (req, res) => {
    const {users_id, name, price, stock, status} = req.body;
    const image = req.file;
    if(image) {
        const target = path.join(__dirname, '../../uploads', image.filename + '-' + image.originalname);
        fs.renameSync(image.path, target);
        connection.query({
            sql: 'INSERT INTO product (users_id, name, price, stock, status, image_url) VALUES (?, ?, ?, ?, ?, ?)',
            values : [parseInt(users_id), name, price, stock, status, `http://localhost:3030/public/${image.originalname}`]
        }, _response(res));
    };
};

// Update Data
const update = (req, res) => {
    const {users_id, name, price, stock, status} = req.body;
    const image = req.file;
    let sql = '';
    let values = [];
    if(image) {
        const target = path.join(__dirname, '../../uploads', image.filename + '-' + image.originalname);
        fs.renameSync(image.path, target);
        sql = 'UPDATE product SET users_id = ?, name = ?, price = ?, stock = ?, status = ?, image_url = ? WHERE id = ?';
        values = [parseInt(users_id), name, price, stock, status, `http://localhost:3030/public/${image.originalname}`, req.params.id]
    }else {
        sql = 'UPDATE product SET users_id = ?, name = ?, price = ?, stock = ?, status = ? WHERE id = ?'
        values = [parseInt(users_id), name, price, stock, status, req.params.id]
    }

    connection.query({sql, values}, _response(res));
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