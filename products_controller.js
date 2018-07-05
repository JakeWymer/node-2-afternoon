module.exports = {
  create: (req, res) => {
    req.app.get('db').create_product([req.body.name, req.body.description, req.body.price, req.body.imageurl])
      .then(() => {
        res.sendStatus(200);
      })
      .catch(err => {
        console.log(err);
        res.status(500).send(err);
      });
  },
  getOne: (req, res) => {
    req.app.get('db').read_product(req.params.id)
      .then(product => {
        res.send(product);
      })
      .catch(err => {
        console.log(err);
        res.status(500).send(err);
      });
  },
  getAll: (req, res) => {
    req.app.get('db').read_products()
      .then(products => {
        res.status(200).send(products);
      })
      .catch(err => {
        console.log(err);
        res.status(500).send(err);
      });
  },
  update: (req, res) => {
    req.app.get('db').update_product([req.params.id, req.query.desc])
      .then(() => {
        res.sendStatus(200);
      })
      .catch(err => {
        console.log(err);
        res.status(500).send(err);
      });
  },
  delete: (req, res) => {
    req.app.get('db').delete_product(req.params.id)
      .then(() => {
        res.status(200).sendStatus(200);
      })
      .catch(err => {
        console.log(err);
        res.status(500).send(err);
      });
  }

}