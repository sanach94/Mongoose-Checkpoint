let mongoose = require('mongoose');
var Schema = mongoose.Schema;
let PersonModel = require('./Model/Person');
const { aggregate } = require('./Model/Person');
require('dotenv').config()

class Database {
  constructor() {
    this._connect()
  }
_connect() {
     mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
       .then(() => {
         console.log('Database connection successful')
       })
       .catch(err => {
         console.error('Database connection error')
       })
  }
}




module.exports = new Database()