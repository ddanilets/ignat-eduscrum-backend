import request from 'superagent';

var router = require('express').Router();

const baseUrl = process.env.NODE_ENV === 'production' ? `0.0.0.0:5001` :
    '0.0.0.0:5000';

const handler = (url, method) => {
    return (q, r) => {
        new Promise((resolve, reject) => {
            console.log(q);
            request(method, baseUrl + url)
                .set('Content-Type', 'application/json')
                .send(q.body)
                .end((err, res) => {
                    console.log(err);
                    if (err) {
                        reject(err || JSON.parse(res.body.text));
                    } else {
                        resolve(JSON.parse(res.text));
                    }
                });
        }).then(data => {
            r.send(data)
        }).catch(err => {
            r.status(500).send(err)
        });
    }
}


router.post('/users/login/', handler('/users/login/', 'POST'));

export default router