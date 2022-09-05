// const { Hello, World } = require ('./module');

// console.log(Hello(), World());

const http = require ('http');
const moment = require ('moment');

const server = http.createServer((req, res) => {
    switch(req.url) {
        case '/welcome': welcome(res); break;
        case '/' : home(res); break;
        default: forbidden404(res); break;
    }
        
});

const welcome = res =>{
    res.statusCode = 200;
    res.setHeader ('Content-Type', 'text/json')
    res.write (JSON.stringify({
        status : 'Successfully',
        message : 'Welcome to NodeJs Bro!',
        study : 'NodeJs',
        loginAt : moment()
    }));
    res.end();
}

const forbidden404 = res =>{
    res.statusCode = 404;
    res.setHeader ('Content-Type', 'text/json')
    res.write (JSON.stringify({
        status : 'Failed',
        message : 'Sorry Not Found :(',
        study : 'NodeJs',
        loginAt : moment()
    }));
    res.end();
}

const home = res => {
    res.end('<h1>Homepage</h1>')
}

server.listen(3030, () => console.log('Server Running at http://127.0.0.1:3030'));