const express = require('express');
const database = require ('./src/database')
database._connect()
const app = express();
const port = 4000;
// app.get('*', function(req, res){
//     res.end('Hello World');
// });

// to parse the req.body
app.use(express.json())
app.use('/', require('./src/routes/persons'))
app.listen(port, function(){
  console.log('The server is running, ' +
      ' please, open your browser at http://localhost:%s', 
      port);
});