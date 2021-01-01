const request = require('postman-request')

const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=826cd375834cdfbfe2f712713a1a27b6&units=f&query=' + lat + ', ' + long

    request({ url: url, json: true }, (error, response, body) => {

        if (error) {
            callback('Unable to connect to weather services', undefined)
        } else if (body.error) {
            callback('Unable to get weather, Try another search', undefined)
        } else {
            callback(undefined, {
                forecast: 'Currently it is ' + body.current.weather_descriptions[0] +
                    ', it is currently ' +
                    body.current.temperature +
                    ' degrees and it feels like ' +
                    body.current.feelslike + '. The humidity is ' +
                    body.current.humidity + '%, cloudcover is ' +
                    body.current.cloudcover + '% and the UV index is ' +
                    body.current.uv_index + '.',
                icon: body.current.weather_icons[0] || ''
            })
        }
    })
}

module.exports = forecast