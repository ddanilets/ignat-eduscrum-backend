import request from 'superagent';

var router = require('express').Router();

const baseUrl = process.env.NODE_ENV === 'production' ? `localhost:5001` :
    'localhost:5000';

const handler = (url, method) => {
    return (r, q) => {
        new Promise((resolve, reject) => {
            request(method, baseUrl + url)
                .set('Content-Type', 'application/json')
                .end((err, res) => {
                    if (err) {
                        reject(err || res.body);
                    } else {
                        resolve(res);
                    }
                });
        }).then(data => {
            r.send(data)
        });
    }
}


router.get('/users/login/', handler('/users/login/', 'GET'));

export default router