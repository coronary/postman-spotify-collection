const cheerio = require('cheerio');
const fs = require('fs');
const {auth_request, base_info, auth, header, host, protocol} = require('./constants.js')

const spotify_url = "https://developer.spotify.com/documentation/web-api/reference/"

let page = fs.readFileSync('working.html')
const $ = cheerio.load(page)

let sections = $('section.category')
let items = [auth_request]

sections.each((_,section) => {
    const name = $(section).children().first().text().split(' ')[0].toUpperCase()
    let group_items  = []
    $(section).find('section.endpoint').each((i, endpoint) => {
        group_items.push(build_items(endpoint))
    })
    items.push({
        name,
        item: group_items
    })
})

function build_items(section) {
    const id = $(section).children().first().attr('id')
    const name = $(section).children().first().text()
    const description = $(section).find('p').first().text()
    const request = $(section).find('.highlight > code').text().trim().split(" ")
    const url = build_url(request[1])
    const queries = table_destructor($(section).find('table[style]'))
    url.query = queries
    const method = request[0]
    return {
        id,
        name,
        description: `${description} reference: ${spotify_url}#${id}`,
        request: {
            url,
            method,
            auth,
            header
        }
    }
}

function build_url(url) {
    return {
        raw: url,
        protocol,
        host,
        path: [
            ...url.slice(url.indexOf('m/')).split('/').slice(1)
        ],
        query: []
    }
}

function table_destructor(table) {
    const queries = table.last().find('tbody > tr')
    let qs = []
    queries.each((_, row) => {
        let query = {disabled:{type:"boolean",default:false}}
        $(row).children().each((x, column) => {
            query.value = ''
            switch(x) {
                case 0:
                    query.key = $(column).children().first().text()
                    query.description = $(column).find('small').text()
                    break
                case 1:
                    query.type = $(column).text()
                    break
                case 2:
                    if($(column).text().toLowerCase() == 'optional'){
                        query.disabled.default = true
                        query.description = `OPTIONAL ${query.description}`
                    } else {
                        query.disabled.default = false
                        query.description = `REQUIRED ${query.description}`
                    } 
                    break
            }
        })
        qs.push(query)
    })
    return qs
}

base_info.item = items
fs.writeFileSync("spotify.postman.json", JSON.stringify(base_info))