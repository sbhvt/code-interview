const express = require('express');

const router = express.Router();

router.get('/:id', function (req, res, next) {
  const avail = require(`../../sample-fixtures/availability.json`);
  const availByIsbn = avail[`ISBN${req.params.id}`];
  res.status(200).send(availByIsbn || {});
});

module.exports = router;
