// const { response } = require("express")

//console.log('Client side js file loaded')


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const imageOne = document.querySelector('#image-1')

messageOne.textContent = ''
messageTwo.textContent = ''
imageOne.src = ''

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    // console.log(location)
    // console.log(encodeURIComponent(location))

    fetch('/weather?address='+ encodeURIComponent(location))
        .then(response => response.json())
        .then(data => {
            
            if (data.error) {
                messageOne.textContent = data.error
                messageTwo.textContent = ''
                imageOne.src = ''
            //    console.log(data.error)
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
                imageOne.src = data.icon
            //    console.log(data.location)
            //    console.log(data.forecast)
            }
        })

})