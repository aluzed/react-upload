"use strict";
const express = require('express');
const app = express();
const cors = require('cors');
const multer = require('multer');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const UploadedFile = require('./models/file');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/uploads', { useMongoClient: true });


const upload = multer({ dest: `./uploads/` });

app.use(cors())

app.get('/', function (req, res) {
  res.send('Hello World!');
})

app.post('/send', upload.single('file'), function (req, res) {
  let f = req.file;

  let tmpFile = new UploadedFile({
    filename      : f.filename,
    mime_type     : f.mimetype,
    original_name : f.originalname,
    path          : f.path,
    size          : f.size
  });

  tmpFile.save((err, doc)=>{
    if(err)
      return res.status(500).send('Unable to write file');

    return res.json(doc);
  })
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
