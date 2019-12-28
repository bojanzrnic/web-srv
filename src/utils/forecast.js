const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/c0a61b6108e81d6b8ba7a3813c22b448/' + latitude + ',' + longitude + '?lang=sr&units=si'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Ne mogu se konektovati na Weather API!', undefined)
        } else if (body.error) {
            callback('Ne mogu pronaći lokaciju.', undefined)
        } else {
//            console.log(body.daily.data[0])
            callback(undefined, body.daily.data[0].summary + ' Trenutno je  ' + body.currently.temperature + ' stepeni Cel. vani. Postoji ' + body.currently.precipProbability + '% mogućnosti za kišu.' + 
                'Maksimalna dnevna temperatura je ' + body.daily.data[0].temperatureHigh + ', a minimalna je ' + body.daily.data[0].temperatureLow +' stepeni Cel.'
            )
        }
    })
}

module.exports = forecast