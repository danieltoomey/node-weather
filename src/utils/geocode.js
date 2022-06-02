const request = require('request')

/*
geocoding convert to long/lat
Address -> Lat/Long -> Weather
mapbox token pk.eyJ1IjoiZGFuaWVsdG9vbWV5IiwiYSI6ImNrdG15eXNiejJhbXAyd25tcHl0YjFuYTYifQ.21GUhO2OJ3r_fDJQCSohuA

https://api.mapbox.com/geocoding/v5/mapbox.places/Boston,MA.json?limit=1&access_token=pk.eyJ1IjoiZGFuaWVsdG9vbWV5IiwiYSI6ImNrdG15eXNiejJhbXAyd25tcHl0YjFuYTYifQ.21GUhO2OJ3r_fDJQCSohuA
*/

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?limit=1&access_token=pk.eyJ1IjoiZGFuaWVsdG9vbWV5IiwiYSI6ImNrdG15eXNiejJhbXAyd25tcHl0YjFuYTYifQ.21GUhO2OJ3r_fDJQCSohuA'
    //console.log("geocode:" + url)
    
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location services')
        } else {
            if (body.features.length == 0) {
                callback('Unable to find location.  Try another search')
            } else {
                const feature = body.features[0]
                callback(undefined, {
                    latitude: feature.center[0],
                    longitude: feature.center[1],
                    location: feature.place_name
                })
            }
        }
    })
}

module.exports = geocode