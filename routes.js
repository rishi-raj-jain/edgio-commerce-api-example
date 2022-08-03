import { products } from './data'
import { Router } from '@layer0/core'
import { categories } from './categories'

export default new Router()
  .get('/images/:path*', ({ cache, serveStatic, setResponseHeader }) => {
    cache({ edge: { maxAgeSeconds: 60 * 60 * 24 * 365 }, browser: false })
    setResponseHeader('Access-Control-Allow-Origin', '*')
    setResponseHeader('Access-Control-Allow-Methods', 'GET')
    setResponseHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    serveStatic('images/:path*')
  })
  .get('/products/all', ({ compute, cache }) => {
    cache({ edge: { maxAgeSeconds: 60 * 60 * 24 * 365 }, browser: false })
    compute((req, res) => {
      res.setHeader('content-type', 'application/json')
      res.setHeader('Access-Control-Allow-Origin', '*')
      res.setHeader('Access-Control-Allow-Methods', 'GET')
      res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
      res.body = JSON.stringify(products)
      res.statusCode = 200
      res.statusMessage = 'OK'
    })
  })
  .get('/categories/all', ({ cache, compute }) => {
    cache({ edge: { maxAgeSeconds: 60 * 60 * 24 * 365 }, browser: false })
    compute((req, res) => {
      res.setHeader('content-type', 'application/json')
      res.setHeader('Access-Control-Allow-Origin', '*')
      res.setHeader('Access-Control-Allow-Methods', 'GET')
      res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
      res.body = JSON.stringify(Object.keys(categories).map((i) => ({ name: i, slug: categories[i]['slug'] }))
      res.statusCode = 200
      res.statusMessage = 'OK'
    })
  })
  .get('/categories/:slug', ({ cache, compute }) => {
    cache({ edge: { maxAgeSeconds: 60 * 60 * 24 * 365 }, browser: false })
    compute((req, res) => {
      res.setHeader('content-type', 'application/json')
      res.setHeader('Access-Control-Allow-Origin', '*')
      res.setHeader('Access-Control-Allow-Methods', 'GET')
      res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
      res.body = JSON.stringify(Object.keys(categories).map(i => categories[i]).find(i => i.slug === req.params.slug))
      res.statusCode = 200
      res.statusMessage = 'OK'
    })
  })
  .get('/products/:slug', ({ compute, cache }) => {
    cache({ edge: { maxAgeSeconds: 60 * 60 * 24 * 365 }, browser: false })
    compute((req, res) => {
      res.setHeader('content-type', 'application/json')
      res.setHeader('Access-Control-Allow-Origin', '*')
      res.setHeader('Access-Control-Allow-Methods', 'GET')
      res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
      res.body = JSON.stringify(products.find((i) => i.slug === req.params.slug))
      res.statusCode = 200
      res.statusMessage = 'OK'
    })
  })
  .get('/product-images/:slug', ({ compute, cache }) => {
    cache({ edge: { maxAgeSeconds: 60 * 60 * 24 * 365 }, browser: false })
    compute((req, res) => {
      res.setHeader('content-type', 'application/json')
      res.setHeader('Access-Control-Allow-Origin', '*')
      res.setHeader('Access-Control-Allow-Methods', 'GET')
      res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
      res.body = JSON.stringify(products.find((i) => i.slug === req.params.slug).images)
      res.statusCode = 200
      res.statusMessage = 'OK'
    })
  })
