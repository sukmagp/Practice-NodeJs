const express = require ('express');
const app = express();
const router = require ('./routes');
const log = require ('./middleware/logger');

app.use(log);
app.use(express.urlencoded({extended:true}));
app.use(router);
app.use((req, res, next) => {
    res.send({
        status: "Failed",
        message: 'Resource' + req.originalUrl + ' Bad Request 404'
    })
})

app.listen(3030, () => console.log('Server: http://localhost:3030'))