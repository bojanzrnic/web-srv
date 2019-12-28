const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const poruka1 = document.querySelector('#poruka1')
const poruka2 = document.querySelector('#poruka2')

//poruka1.textContent = 'poruka1'


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    poruka1.textContent = "Učitavam..."
    poruka2.textContent = ''

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                poruka1.textContent = data.error
            } else {
                poruka1.textContent = data.location
                poruka2.textContent = data.forecast
            }
        })
    })

    search.value = ''
})