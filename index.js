const express = require('express');
const path = require('path');
const port = 8000;
const db = require('./config/mongoose');
const Contact = require('./models/contact');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));


// var contactList = [
//     {
//         name: 'Ajay',
//         phone: '8522875956',
//     },
//     {
//         name: 'Biradar',
//         phone: '9121750089',
//     },
//     {
//         name: 'Jackson',
//         phone: '9989267984',
//     }
// ]

app.get('/', function (req, res) {

    Contact.find({})
        .then((contactList) => {
            return res.render('home', {
                title: 'My Contact List',
                contact_list: contactList
            });
        })
        .catch((err) => {
            console.log(err);
        });

    // return res.render('home', {
    //     title: 'My Contact List',
    //     contact_list: contactList
    // });
});

app.get('/delete-contact/', function (req, res) {
    const id = req.query.id;
    Contact.findByIdAndDelete(id)
        .then(() => {
            return res.redirect('/');
        }).catch((err) => {
            return console.log("error");
        })


});

app.post('/create-contact', function (req, res) {

    // contactList.push({
    //     name: req.body.name,
    //     phone: req.body.phone,
    // });
    // Contact.create({
    //     name: req.body.name,
    //     phone: req.body.phone
    // }, function (err, Contact) {
    //     if (err) {
    //         console.log(err, 'Error in creating the contact');
    //         return;
    //     }

    // });
    // return res.redirect('/');
    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    }).then(() => {
        console.log('******', Contact);
        res.redirect('/');
    }).catch((err) => {
        console.log(err, 'Error in creating the contact');
        return;
    })
});



app.listen(port, function (err) {
    if (err) {
        console.log(err, 'we have an error');
        return;
    } else {
        console.log("Port is running perfectly on: ", port);
    }
})