const express = require('express');
const multer = require('multer');

const db = require('../data/database.js')

const storageConfig = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storageConfig });
const router = express.Router();

router.get('/', async function (req, res) {
  const users = await db.getDb().collection('users').find().toArray();
  res.render('profiles', { users });
});

router.get('/new-user', function(req, res) {
  res.render('new-user');
});

// new-user.ejs
// <form action="/profiles" ...>, <input type="file" ... name="image" ... />
router.post('/profiles', upload.single('image'), async function (req, res) {
  const uploadedImageFile = req.file;
  const userData = req.body;

  await db.getDb().collection('users').insertOne({
    name: userData.username,
    imagePath: uploadedImageFile.path,
  });

  console.log(uploadedImageFile);
  console.log(userData);

  res.redirect('/');
})

module.exports = router;