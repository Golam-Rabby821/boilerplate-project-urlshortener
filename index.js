require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

const bodyParser = require('body-parser')

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use(bodyParser.urlencoded({extended: false}))

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.post('/api/shorturl', (req, res) => {

  console.log(req.body.url)
  let urlObject = new URL(req.body.url)
  console.log(urlObject)

  if(urlObject.protocol === 'https:'){
    let shortend_url = Math.floor(Math.random()*10000).toString();
    res.json({
      original_url: urlObject.href ,
      short_url: shortend_url
    })
  }else{
    res.json({ error: 'invalid url'})
  }
})

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
