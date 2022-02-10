import { Book } from '../models/book.js'
import { Profile } from '../models/profile.js'

import axios from 'axios'

export {
    search,
    index,

}

function search(req, res) {
  axios.get(`https://www.googleapis.com/books/v1/volumes?q=${req.body.search}:keyes&key=${process.env.API_KEY}`)
  .then(response => {
    res.render('book/index', {
      title: 'Search results',
      results: response.data.items,
    })
  })
  .catch(err => {

    console.log(err)
    res.redirect('/')
  })
}


  
  function index(req, res) {
    
      res.render('book/index', {
        title: 'All Book',
        results: null,
      })
  }
  
 
  