import { Router } from 'express'
import * as bookCtrl from '../controllers/book.js'


export {
  router
}

const router = Router()
router.get('/', bookCtrl.index)
router.post('/search', bookCtrl.search)



function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/auth/google");
}