const path = require('path');
const express = require('express');
const hbs = require('hbs');

const app = express();
// definiši view engine kao "handlebars"
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../templates/views'));
hbs.registerPartials(path.join(__dirname, '../templates/partials'));

// putanje do statičkog foldera
app.use(express.static(path.join(__dirname, '../public')));

// definisanje ruta
app.get('', (req, res) => {
  res.render('index', {
    title: "Weather Applikac",
    name: "Bojan Zrnić"
  })
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: "About Weather",
    name:  "Bojan Zrnić"
  })
})

app.get('/weather', (req, res) => {
  if(!req.query.address) {
    return res.send({
      error: "Moraš poslati adresu"
    })
  };
  res.send({
    title: "About Weather",
    name:  "Bojan Zrnić",
    adress: req.query.address
  })
});


app.get('/help', (req, res) => {
  res.render('help', {
    message: "help tehts tsghek doajh aoih ahd a",
    title: "Help Weather",
    name:  "Bojan Zrnić"
  })
})

app.get('*', (req, res) => {
  res.render('error404', {
    greska: "Greška na starnici 404"
  })
})

app.get('/helo/*', (req, res) => {
  res.render('error404', {
    greska: "Help tema nije pronađena"
  })
})

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server je pokrenut na portu: ${port}`));