const express = require('express');

const router = express.Router();

router.get('/:id', function (req, res) {
  // eslint-disable-next-line global-require
  const avail = require(`../../sample-fixtures/availability.json`);
  const availByIsbn = avail[`ISBN${req.params.id}`];
  res.status(200).send(availByIsbn || { availability: [] });
});

module.exports = router;
