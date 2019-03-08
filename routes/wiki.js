const express = require('express');
const router = express.Router();
const { Page } = require("../models");
const { main, addPage } = require("../views");

router.get('/', (req, res) => {
  res.send(main())
})

router.post('/', async (req, res, next) => {

  const page = new Page({
    title: req.body.title,
    content: req.body.content,
    status: 'open'
  });

  try {
    await page.save();
    console.log(page)
    res.redirect('/');
  } catch (error) { next(error) }
})

router.get('/add', (req, res) => {
  res.send(addPage())
})

module.exports = router;
