const encode = require('btoa');
const decode = require('atob');
const validURL = require('valid-url');
const Urls = require('../models/url').Urls;
const express = require('express');
const router = express.Router();

/* GET home page. */
router.route('/')
.get((req, res, next) => {
  res.render('index', { title: 'Express' });
})
.post((req, res, next) => {
  if(!validURL.isUri(req.body.url)) {
    const err = new Error("Input url is wrong");
    err.status = 404;
    return next(err);
  }

  Urls.create({url: req.body.url})
  .then((url) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({
      'short-url': encode(url._id),
      'original-url': req.body.url
    });
  }, (err) => next(err))
  .catch((err) => next(err));
});

router.route('/:url')
.get((req, res, next) => {
  const id = decode(req.params.url);

  Urls.findOne({_id: id})
  .then((url) => {
    if(!url) {
      const err = new Error('Url ', req.params.url, ' doesn\'t exist');
      err.status = 404;
      return next(err);
    }
    res.statusCode = 302;
    res.location(url.url);
    res.end();
  }, (err) => next(err))
  .catch((err) => next(err));
});

module.exports = router;
