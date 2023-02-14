import { categories } from '../../categories'

export const getAllCategories = (router) => {
  router.get('/categories/all', ({ cache, compute }) => {
    cache({ edge: { maxAgeSeconds: 60 * 60 * 24 * 365 }, browser: false })
    compute((req, res) => {
      res.setHeader('content-type', 'application/json')
      res.setHeader('Access-Control-Allow-Origin', '*')
      res.setHeader('Access-Control-Allow-Methods', 'GET')
      res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
      res.body = JSON.stringify(Object.keys(categories).map((i) => ({ name: i, slug: categories[i]['slug'] })))
      res.statusCode = 200
      res.statusMessage = 'OK'
    })
  })
}

export const getSpecificCategory = (router) => {
  router.get('/categories/:slug', ({ cache, compute }) => {
    cache({ edge: { maxAgeSeconds: 60 * 60 * 24 * 365 }, browser: false })
    compute((req, res) => {
      res.setHeader('content-type', 'application/json')
      res.setHeader('Access-Control-Allow-Origin', '*')
      res.setHeader('Access-Control-Allow-Methods', 'GET')
      res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
      res.body = JSON.stringify(
        Object.keys(categories)
          .map((i) => categories[i])
          .find((i) => i.slug === req.params.slug)
      )
      res.statusCode = 200
      res.statusMessage = 'OK'
    })
  })
}
