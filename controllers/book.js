import { Book } from '../models/book.js'
import { Profile } from '../models/profile.js'

import axios from 'axios'

export {
    index,

}


  
  function index(req, res) {
    
      res.render('book/index', {
        title: 'All Book',
        results: null,
      })
  }
  
 
  