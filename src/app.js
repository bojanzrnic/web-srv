const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Vremenska prognoza',
        name: 'Bojan Zrnić'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'O meni',
        name: 'Bojan Zrnić'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'Ovo je tekst za pomoć.',
        title: 'Pomoć',
        name: 'Bojan Zrnić'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Marate unijeti adresu!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'Morate unijeti ključ za pretraživanje.'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Bojan Zrnić',
        errorMessage: 'Help članak nije pronađen.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Bojan Zrnić',
        errorMessage: 'Stana nije pronađena.'
    })
})

app.listen(port, () => {
    console.log('Server je na portu '+port)
})