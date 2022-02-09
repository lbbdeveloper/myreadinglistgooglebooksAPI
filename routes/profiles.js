import { Router } from 'express'
import * as profileCtrl from '../controllers/profiles.js'


export {
  router
}

const router = Router()
router.get('/:id', isLoggedIn, profileCtrl.show)



function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/auth/google");
}