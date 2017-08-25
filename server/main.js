const express = require('express');
const {resolve} = require('path')

const WebsiteImage = require('./create-website-image');
const Favicon = require('./create-favicon');

const app = express();

app.get('/favicon/:url', (req, res) => {

    setTimeout(() => {
        res.send({
            'error': 'Connection Timeout'
        });
        console.log('request canceled after 5 seconds');
    }, 5000);

    const img = new Favicon(`http://${req.params.url}`);
    img.request().then(url => {
        res.send(url);
    });

});

app.get('/website/:url', (req, res) => {

    setTimeout(() => {
        res.send({
            'error': 'Connection Timeout'
        })
    }, 15000);

    const img = new WebsiteImage(`http://${req.params.url}`);
    img.request().then(filepath => {
        console.log(resolve(filepath));
        res.sendFile(resolve(filepath));
    });


});

app.listen(4000);




