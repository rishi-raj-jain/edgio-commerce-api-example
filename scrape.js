const fs = require('fs-extra')
const axios = require('axios')
const cheerio = require('cheerio')
const imageDomain = 'https://layer0-docs-layer0-ecommmerce-api-example-default.layer0-limelight.link'
/*
    Format:
        name: String
        path: lower case string with slashes
        description: Description in ul classes
        prices: { price: { value: 80, currencyCode: 'USD' }, salePrice: null, retailPrice: null },
        images: [ { url }, { url }, ... ]
        slug: path with removed slashes
        price: { value: 80, currencyCode: 'USD' },
*/
const products = {}

const getProducts = async () => {
  const { data } = await axios.request({
    url: 'https://edgioswagshop.com/products',
    method: 'get',
    headers: {
      Cookie:
        'pcc_bpc=RLuvxSmozHSNx7c7ZMQVys+ee0dwmkvG2eqvEMA5bGn3GOnypNqaNHDxTiUFvd/lyFrUaHNn4D/bYILoDodtsqxaR0wAK5qNqT/aEcgYx9TOaAAgt5cIM2GAJuf9/e8jNORu5yxs8/LrOxNtp/R4l4lhUOohZYe22LrAeME9B9oEywZgN+NqHLa+Wyq77OqiMtX8k1c379gZVIAKqX8qOeqpxSUcUsOaO+/6VcLT3esESYI3egaewTDtXjXTJiN7l/QrZrFfRhW/jLfzgonHu6rCu0l7FN9XDWN3+kanaKgQpFOReyIGCNLpnkghuk7U8hgANt7RFjU+jrrsHPlRsqjGXNcbRgDKxSbAX/4o6787QFIzOzLPl5gYO4lq+l8rJhyGEUJQOX7wdequrBNnJRUHtYvgmc6X0BepgwXkmUmhXmrEfsN9Pqb8pEDbsTrwORWXQr5fV+nbwjZKzfnV1v2N+ArSjsJCdOAw3x1pJYkILyoAt5lofr+ZNh0C4B89PBCYdvy8LhpVe+ARsFTZdFqilOL0eGWy6WdHji1zYkF0CDKYD9E9EyeJaLBSdoRZ7ggOmP49rTtgbRUVh7mrBVMgPIoSYa3CSTLN0VvU0vM=;',
    },
  })
  let $ = cheerio.load(data)
  let pdpLinks = {}
  $('.product-thumbnail').each((i, el) => {
    let itemName = $(el).find('.thumbnail-description-container').find('h5').text()
    pdpLinks[$(el).find('a').attr('href')] = { name: itemName }
    let itemPrice = $(el).find('.thumbnail-description-container').find('p').text()
    let slug = itemName
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '')
    let path = `/${slug}/`
    products[itemName] = {
      path,
      slug,
      name: itemName,
      categories: itemName.split(' ').filter((i) => i),
      prices: {
        price: { value: itemPrice.match(/^([a-z]*)([^\d])([\d.,]+)$/i)[3], currencyCode: itemPrice.match(/^([a-z]*)([^\d])([\d.,]+)$/i)[2] },
        salePrice: null,
        retailPrice: null,
      },
      price: {
        value: itemPrice.match(/^([a-z]*)([^\d])([\d.,]+)$/i)[3],
        currencyCode: itemPrice.match(/^([a-z]*)([^\d])([\d.,]+)$/i)[2],
      },
    }
  })

  for (const i of Object.keys(pdpLinks)) {
    let url = i
    if (url.includes('http')) {
    } else {
      url = `https://edgioswagshop.com${url}`
    }
    const { data } = await axios.request({
      url,
      method: 'get',
      headers: {
        Cookie:
          'pcc_bpc=RLuvxSmozHSNx7c7ZMQVys+ee0dwmkvG2eqvEMA5bGn3GOnypNqaNHDxTiUFvd/lyFrUaHNn4D/bYILoDodtsqxaR0wAK5qNqT/aEcgYx9TOaAAgt5cIM2GAJuf9/e8jNORu5yxs8/LrOxNtp/R4l4lhUOohZYe22LrAeME9B9oEywZgN+NqHLa+Wyq77OqiMtX8k1c379gZVIAKqX8qOeqpxSUcUsOaO+/6VcLT3esESYI3egaewTDtXjXTJiN7l/QrZrFfRhW/jLfzgonHu6rCu0l7FN9XDWN3+kanaKgQpFOReyIGCNLpnkghuk7U8hgANt7RFjU+jrrsHPlRsqjGXNcbRgDKxSbAX/4o6787QFIzOzLPl5gYO4lq+l8rJhyGEUJQOX7wdequrBNnJRUHtYvgmc6X0BepgwXkmUmhXmrEfsN9Pqb8pEDbsTrwORWXQr5fV+nbwjZKzfnV1v2N+ArSjsJCdOAw3x1pJYkILyoAt5lofr+ZNh0C4B89PBCYdvy8LhpVe+ARsFTZdFqilOL0eGWy6WdHji1zYkF0CDKYD9E9EyeJaLBSdoRZ7ggOmP49rTtgbRUVh7mrBVMgPIoSYa3CSTLN0VvU0vM=;',
      },
    })
    $ = cheerio.load(data)
    products[pdpLinks[i]['name']]['images'] = []
    $('[data-toggle="lightbox"]').each((_, el) => {
      let imagePath = `/images/products/${pdpLinks[i]['name']}/${_}.png`
      axios
        .get($(el).attr('href'), {
          responseType: 'arraybuffer',
        })
        .then((response) => Buffer.from(response.data, 'base64'))
        .then((res) => {
          fs.outputFile(`.${imagePath}`, res)
            .then(() => {
              console.log('✅')
            })
            .catch(console.log)
        })
      products[pdpLinks[i]['name']]['images'].push({ url: `${imageDomain}${imagePath}` })
    })
    products[pdpLinks[i]['name']]['description'] = $('.product-overview ul')
      .parent()
      .find('*')
      .each(function () {
        this.attribs = {}
      })
      .html()
  }

  let categories = {}
  let finalProducts = Object.keys(products).map((i) => products[i])
  finalProducts.forEach((i) => {
    i.categories.forEach((j) => {
      if (categories.hasOwnProperty(j)) {
        categories[j].push(i)
      } else {  
        categories[j] = [i]
      }
    })
  })
  let catKeys = Object.keys(categories)
  catKeys.forEach((i) => {
    if (categories.hasOwnProperty(i)) {
      if (categories[i].length > 1) {
      } else {
        delete categories[i]
      }
    }
  })
  let catKeys = Object.keys(categories)
  catKeys.forEach((i) => {
    if (categories.hasOwnProperty(i)) {
        categories[i] = { slug: i.toLocaleLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''), ...categories[i] } 
    }
  })

  try {
    fs.outputFile('./data.js', `export const products= ${JSON.stringify(finalProducts)}`)
    fs.outputFile('./categories.js', `export const categories= ${JSON.stringify(categories)}`)
    console.log('✅')
  } catch (e) {
    console.log(e)
  }
}

getProducts()
