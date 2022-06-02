// console.log('js is loaded')

//front-end only!

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()

    messageOne.textContent = 'Loading'
    messageTwo.textContent = ''

    const weatherLocation = search.value
    // console.log('testing for ' + weatherLocation)
    if (! weatherLocation) {
        messageOne.textContent = 'Please enter a value'
        return
    }

    const url = 'http://localhost:3000/weather?address=' + weatherLocation
    fetch(url).then((response) => {
        response.json().then((data) => {
            const {error, forecast, location, address} = data
            if (error) {
                messageOne.textContent = error
                return
            }
            messageOne.textContent = location
            messageTwo.textContent = forecast
        })
    })  
})