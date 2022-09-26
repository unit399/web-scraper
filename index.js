const PORT = 8000

const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')

const app = express()

//target url
const url = 'https://www.theguardian.com/uk'

axios(url).then(response => {
    const html = response.data
    const $ = cheerio.load(html)

    const articles = []

    //should be configured based on the target url and the data wanted to be scraped.
    $('.fc-item__title', html).each(function() {
        const titleOfArticle = $(this).text()
        const urlOfArticle = $(this).find('a').attr('href')

        //push scraped data into an array for further process
        articles.push({
            titleOfArticle,
            urlOfArticle
        })
    })

    console.log(articles)
}).catch(err => console.log(err))

//start the app
app.listen(PORT, () => console.log('Server running on PORT: ' + PORT))