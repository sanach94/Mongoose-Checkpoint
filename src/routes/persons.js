const express = require('express')
const router = express.Router()
const Person = require('../Model/Person')


// add new person
router.post('/', (req, res) => {
    let info = req.body
    let newPerson = new Person(info)
    newPerson.save()
        .then(person => res.send(person))
        .catch(err => console.log(err.message))
})

// add many people


router.post('/manyPeople', (req, res) => {
    let info = req.body
     Person.create(info)
        .then(manyPeople => res.send(manyPeople))
        .catch(err => console.log(err.message))
})
router.get('/manyPeople/:name', (req, res) => {
        Person.find({name: req.params.name})
        .then(person => res.send(person))
        .catch(err => console.log(err.message))
})
router.get('/manyPeople/favoriteFoods/:favoriteFoods', (req, res) => {
    Person.findOne({favoriteFoods: req.params.favoriteFoods })
    .then(person => res.send(person))
    .catch(err => console.log(err.message))
})
router.get('/manyPeople/id/:id', (req, res) => {
    Person.findById(req.params.id)
    .then(person => res.send(person))
    .catch(err => console.log(err.message))
})

router.put('/manyPeople/findAndUpdate/:id', (req, res) => {
    Person.findById(req.params.id) 
        .then(person => {
            person.favoriteFoods.push(req.body.favoriteFoods)

            person.save()
                .then(updated => res.send(updated))
                .catch(err => console.log(err.message))
        }
            )
        .catch(err => console.log(err.message))
})
router.put('/manyPeople/findOneAndUpdate/:name', (req, res) => {
    Person.findOneAndUpdate({name: req.params.name},
        {$push: {favoriteFoods: req.body.favoriteFoods}},
        {
            new: true,                       
            runValidators: true              
          })
    .then(person => res.send(person))
    .catch(err => console.log(err.message))
})
router.delete('/manyPeople/findOneAndRemove/:id', (req, res) => {
    Person.findOneAndRemove({id: req.params.id})
    .then(response => res.send("person deleted"))
      .catch(err => {
        console.error(err)
})
})
  router.delete('/manyPeople/Remove/:name', (req, res) => {
    Person.deleteMany({ name: req.params.name })
        .then(person => res.send({msg: person.deletedCount}))
        .catch(err => console.log(err.message))
    
  })
  router.get('/manyPeople/NarrowSearch', (req, res) => {
    query.find({name: "Spagetti"})                  
        .sort({name: 1})         
         .limit(2)                
         .select({age: false} )
         .exec()                   
         .then(docs => {
            console.log(docs)
          })
         .catch(err => {
            console.error(err)
          })
        })
module.exports = router