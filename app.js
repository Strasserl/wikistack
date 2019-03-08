const express = require('express');
const app = express();
const morgan = require('morgan');
const main = require('./views/main.js');
const models = require('./models');
const wikiRouter = require('./routes/wiki');
const userRouter = require('./routes/user');

app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(express.static(__dirname + "/stylesheets"));

app.use('/wiki', wikiRouter);

app.get('/', (req, res) => {
  res.send(main(' '))
})

models.db.authenticate().
then(() => {
  console.log('connected to the database');
})

const initialize = async () => {
  await models.db.sync({force: true})

  const port = 3000;
  app.listen(port);
}

initialize();
