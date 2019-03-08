const express = require('express');
const router = express.Router();
const views = require('../views');
const { Page } = require("../models");
const { addPage } = require("../views");

router.get('/', (req, res) => {
  res.send(views.main())
})

router.post('/', async (req, res, next) => {

  const page = new Page({
    title: req.body.title,
    content: req.body.content
  });

  try {
    await page.save();
    res.redirect('/');
  } catch (error) { next(error) }
})

router.get('/add', (req, res) => {
  res.send(views.addPage())
})



module.exports = router;
