require('dotenv').config();

const mailgun = require("mailgun-js");
const DOMAIN = process.env.domain;
const mg = mailgun({apiKey: process.env.apiKey, domain: DOMAIN});
const data = {
        from: 'Excited User <me@samples.mailgun.org>',
        to: 'swistek.labs@gmail.com',
        subject: 'Hello',
        text: 'Testing some Mailgun awesomness!'
};
mg.messages().send(data, function (error, body) {
console.log('errors:', error);
        console.log('body:', body);
});
