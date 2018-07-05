require('dotenv').config();
const express = require('express');
const {json} = require('body-parser');
const massive = require('massive');

const app = express();
app.use(json());

const PORT = process.env.PORT;

const prodCtrl = require('./products_controller');

massive(process.env.CONNECTION_STRING)
  .then(db => {
    app.set('db', db);
    app.get('db').create_products_table()
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  })
  .catch(err => {
    console.log(err);
  });

app.get('/api/products', prodCtrl.getAll);
app.get('/api/product/:id', prodCtrl.getOne);
app.put('/api/product/:id', prodCtrl.update);
app.post('/api/product', prodCtrl.create);
app.delete('/api/product/:id', prodCtrl.delete);

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});