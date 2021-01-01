// require geocoding modules
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const path = require('path')
const express = require('express')
const hbs = require('hbs')
const { registerHelper } = require('hbs')
const { runInNewContext } = require('vm')

// DEfine paths for Express config
const publicdir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Set optional extentions for Express
const options = {
    extensions: ['html', 'htm']
}

const app = express()
const port = process.env.PORT || 3000

// Setup HandleBars and view path
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicdir, options))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Dan Watters'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Weather',
        name: 'Dan Watters'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Dan Watters',
        msg: 'Not much to say, just enter anything that would identify a location. \n It could be a zip code, city, full address, partial location name'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, Location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, { forecast } = {}) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                address: req.query.address,
                location: Location,
                forecast
            })
            // console.log(Location)
            // console.log(forecast)
        })
    })

    //    res.send({
    //     address: req.query.address,
    //     forecast: 'Sunny chance of snow',
    //     location: 'Colorado Springs'
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    res.send({
        products: []

    })
})


app.get('/help/*', (req, res) => {
    res.render('error404', {
        title: 'Help 404',
        name: 'Dan Watters',
        msg: 'Help article not found'
    })

})
app.get('*', (req, res) => {
    res.render('error404', {
        title: '404',
        name: 'Dan Watters',
        msg: 'Page not found'
    })

})


// Start up the server
app.listen(port, () => {
    console.log('Server is up on port ' + port)
})