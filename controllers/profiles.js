import { Profile } from '../models/profile.js'
import { Book } from '../models/book.js'
import axios from 'axios'


export {
    show,
}

  function show(req, res) {
    Profile.findById(req.params.id)
    .populate('books')
    .then(profile => {
      Book.find({ collectedBy: profile._id })
      .then(books => {
          res.render('profile/show', {
            title: `My Reading List`,
            profile,
            books
          })
      })
    })
    .catch(err => {
      console.log(err)
      res.redirect('/')
    })
  }


 