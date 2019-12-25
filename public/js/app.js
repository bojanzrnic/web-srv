console.log('klijent JS fajl učitan');

fetch('http://puzzle.mead.io/puzzle')
    .then((respons) => {
        respons.json()
        .then((data) => {
            console.log(data)
        })
    })