const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

function saveToFile(content, callback) {
  const outDir = path.join(__dirname, '../../sample-fixtures');
  const output = path.join(outDir, `holds.json`);

  // eslint-disable-next-line func-names
  fs.writeFile(output, content, function (err) {
    if (err) throw err;
    if (callback) callback(output);
    console.log(`Saved content to ${output}`);
  });
}

router.get('/:id', function (req, res) {
  // eslint-disable-next-line global-require
  const holds = require(`../../sample-fixtures/holds.json`);
  const holdsForUser = holds[req.params.id];
  res.status(200).send(holdsForUser || []);
});

/** Hacky little function to add a new hold for our fake end to end integration.
 *
 * To test manually with curl:
 * curl -d '{"resource_type":"book","isbn":"isbn1","branch_requested_to":"Keele"}' -H 'Content-Type: application/json'  http://localhost:2006/holds/user1
 *
 */
router.post('/:id', function (req, res) {
  // this is just to make a hacky file-based option for here
  // eslint-disable-next-line global-require
  const holds = require(`../../sample-fixtures/holds.json`);
  const holdsForUser = holds[req.params.id] || [];

  const today = new Date();
  const todayPlus3 = new Date(today.setDate(today.getDate() + 3));
  const newHold = {
    resource_type: req.body.resource_type,
    isbn: req.body.isbn,
    hold_details: {
      date_requested: today.toISOString().substring(0, 10),
      status: 'HOLD_REQUESTED',
      date_estimated: todayPlus3.toISOString().substring(0, 10),
      branch_requested_from: req.body.branch_requested_from || "Fern Gully",
      branch_requested_to: req.body.branch_requested_to,
    },
    resource_metadata: {},
  };

  if (req.body.resource_type == 'book') {
    newHold.isbn = req.body.isbn;
    if (req.body.isbn === 'isbn1') {
      newHold.resource_metadata[`${req.body.resource_type}_title`] = 'Station Eleven';
      newHold.resource_metadata[`${req.body.resource_type}_author`] = 'Emily St. John Mandel';
    } else if (req.body.isbn === 'isbn2') {

      newHold.resource_metadata[`${req.body.resource_type}_title`] = 'Death on the Nile';
      newHold.resource_metadata[`${req.body.resource_type}_author`] = 'Agatha Christie';
    } else if (req.body.isbn === 'isbn3') {

      newHold.resource_metadata[`${req.body.resource_type}_title`] = 'Jurassic Park';
      newHold.resource_metadata[`${req.body.resource_type}_author`] = 'Michael Crichton';
    }
  }


  holdsForUser.push(newHold);
  holds[req.params.id] = holdsForUser;

  saveToFile(JSON.stringify(holds, 0, 2), () => {
    res.status(200).send({ success: true });
  });
});

module.exports = router;
