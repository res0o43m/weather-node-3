const request = require( 'postman-request')

const forecast = (lat, long,callback) => {
const url = 'http://api.weatherstack.com/current?access_key=826cd375834cdfbfe2f712713a1a27b6&units=f&query='+ lat + ', ' + long

request({ url: url, json: true}, (error, response, body) => {
    //console.log(response.body.current)
    if (error) {
        callback('Unable to connect to weather services',undefined)
    } else if (body.error) {
        callback('Unable to get weather, Try another search',undefined)
    }else {
        callback(undefined, {
            forecast: body.current.weather_descriptions[0] +
            ', it is currently ' +
            body.current.temperature + 
            ' degrees out there.  It feels like ' + 
            body.current.feelslike + ' out there'
    
        })
    }
})
}

module.exports = forecast