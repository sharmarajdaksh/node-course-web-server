const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
let app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err) {
            console.log('Unable to append to server.log');
        }
    })
    next();
})

//
// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// })
//

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => (new Date().getFullYear()));
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});


app.get('/', (req, res) => {
    // res.send('Hello Express!');

    // res.send({
    //     name: 'Andrew',
    //     like: [
    //         'biking',
    //         'reading'
    //     ]
    // });

    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to home'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
    });
});

app.get('/projects', (req, res) => {
    res.render('projects.hbs', {
        pageTitle: 'Projects Page',
        welcomeMessage: 'Portfolio page here'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Something went wrong'
    });
});


app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});