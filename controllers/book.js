import { Book } from '../models/book.js'
import { Profile } from '../models/profile.js'

import axios from 'axios'

export {
    search,
    index,
    show,
    addToList,
    removeFromList,
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

function removeFromList(req, res) {
  Book.findOne({ googleId: req.params.id })
  .then(book => {
    book.collectedBy.remove({ _id: req.user.profile._id })
    book.save()
    .then(()=> {
      res.redirect(`/myreadinglist/${req.user.profile._id}`)
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}


function addToList(req, res) {

  Profile.findById(req.user.profile._id)
  .then(profile=>{
  Book.findOne({ googleId: req.body.googleId })
    .then(book => {
      if (book){
        book.collectedBy.push(req.user.profile._id)
        book.save()
        res.redirect(`/myreadinglist/${profile._id}`)
      } else {
        req.body.collectedBy = req.user.profile._id
        Book.create(req.body)
        res.redirect(`/myreadinglist/${profile._id}`)
      }
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
  
  function show(req, res) {
    axios.get(`https://www.googleapis.com/books/v1/volumes/${req.params.id}?key=${process.env.API_KEY}`)
  .then(response => {
    Book.findOne({ googleId: response.data.id })
    .then(book => {
      res.render('book/show', {
        title: 'Book Details',
        apiResult: response.data.volumeInfo,
        book,
        googleId: response.data.id,
        userHasBook: book?.collectedBy.some(profile => profile._id.equals(req.user.profile._id)),
      })
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
  }
  