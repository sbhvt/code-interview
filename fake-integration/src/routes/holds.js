const express = require('express');

const router = express.Router();

router.get('/:id', function (req, res) {
  // eslint-disable-next-line global-require
  const holds = require(`../../sample-fixtures/holds.json`);
  const holdsForUser = holds[req.params.id];
  res.status(200).send(holdsForUser || []);
});

module.exports = router;
