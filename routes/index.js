import { Router } from 'express'

export {
  router
}

const router = Router()
router.get('/', function (req, res) {
  // "render using server local address, while router / is url address; show it to requestor"
  res.render('index', { title: 'MyReadingList', user: req.user ? req.user : null })
})
