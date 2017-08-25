const express = require('express');
const express_bodyparser = require('body-parser')
const {resolve} = require('path');


const WebsiteImage = require('./create-website-image');
const Favicon = require('./create-favicon');

const app = express();
app.use(express_bodyparser.json());

app.post('/favicon/', (req, res) => {
    if (req.body) {
        if (req.body.url) {

            setTimeout(() => {
                if (!res._headerSent) {
                    res.send({ 'error': 'Connection Timeout' });
                    console.log('request canceled after 5 seconds');
                }
            }, 5000);

            const img = new Favicon(req.body.url);
            img.request().then(url => {
                res.send(url);
            });

        } else {
            res.send({ 'error': 'No url provided in request' });
        }
    } else {
        res.send({ 'error': 'we\'ve got a severe headache here!' });
    }

});

app.post('/website/', (req, res) => {
    if (req.body) {
        if (req.body.url) {

            setTimeout(() => {
                if (!res._headerSent) {
                    res.send({ 'error': 'Connection Timeout' });
                    console.log('request canceled after 15 seconds');
                }
            }, 15000);

            const img = new WebsiteImage(req.body.url);
            img.request().then(filepath => {
                console.log(resolve(filepath));
                res.sendFile(resolve(filepath));
            });

        } else {
            res.send({ 'error': 'No url provided in request' });
        }
    } else {
        res.send({ 'error': 'we\'ve got a severe headache here!' });
    }
});

app.listen(4000);




