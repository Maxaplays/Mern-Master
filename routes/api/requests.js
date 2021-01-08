const router = require('express').Router();
const { request } = require('express');
let Request = require('../../models/Request');

router.route('/').get((req, res) => {
  Request.find()
    .then(requests => res.json(requests))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const user = req.body.user;
  const pickup = req.body.pickup;
  const leftoff = req.body.leftoff;
  const type = req.body.type;
  const price = req.body.price;
  const date = Date.parse(req.body.date);
  const admin = req.body.admin;
  const calidad = req.body.calidad

  const newRequest = new Request({
    user,
    pickup,
    leftoff,
    type,
    price,
    date,
    admin,
    calidad
  });

  newRequest.save()
  .then(() => res.json('Request added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Request.findById(req.params.id)
    .then(request => res.json(request))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Request.findByIdAndDelete(req.params.id)
    .then(() => res.json('Request deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Request.findById(req.params.id)
    .then(request => {
      request.user = req.body.user;
      request.pickup = req.body.pickup;
      request.leftoff = req.body.leftoff;
      request.type = req.body.type;
      request.price = req.body.price;
      request.date = Date.parse(req.body.date);
      request.admin = req.body.admin;
      request.calidad = req.body.calidad;

      request.save()
        .then(() => res.json('Request updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;