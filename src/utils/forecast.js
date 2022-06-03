/*
http://api.weatherstack.com/
api access key c0890a6a8d795b1c75b2752cd984288a

http://api.weatherstack.com/current
    ? access_key = YOUR_ACCESS_KEY
    & query = New York
    
// optional parameters: 
    & units = m
    & language = en
    & callback = MY_CALLBACK
*/

const request = require("request")

const forecast = (longitude, latitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=c0890a6a8d795b1c75b2752cd984288a&query=' + latitude + ',' + longitude + '&units=f'
    //console.log("calling url:" + url)

    request({ uri: url, json: true}, (error, {body}) => {
        if (error) {
            callback('WeatherStack ERROR: ' + error)
        } else if (body.err) {
            callback('WeatherStack error:' + body.error)
        } else {
            const {weather_descriptions, temperature, feelslike, wind_speed, wind_dir} = body.current
            var direction = ''
            if (wind_dir == 'E') direction = 'East'
            if (wind_dir == 'W') direction = 'West'
            if (wind_dir == 'N') direction = 'North'
            if (wind_dir == 'S') direction = 'South'
            callback(undefined, 'At ' + latitude + ',' + longitude + 
            ' the weather is ' + weather_descriptions[0] + '. It is currently ' + temperature + ' degrees out and it feels like ' + feelslike + '. The wind is ' + wind_speed + ' mph from the ' + direction)
        }
    })
}

module.exports = forecast