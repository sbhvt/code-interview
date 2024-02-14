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
 * curl -d '{"resource_type":"book","title":"Station Eleven","branch_requested_to":"Keele","branch_requested_from":"Fern Gully"}' -H 'Content-Type: application/json'  http://localhost:2006/holds/user1
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
    hold_details: {
      date_requested: today.toISOString().substring(0, 10),
      status: 'CHECKED_OUT',
      date_estimated: todayPlus3.toISOString().substring(0, 10),
      branch_requested_from: req.body.branch_requested_from,
      branch_requested_to: req.body.branch_requested_to,
    },
    resource_metadata: {},
  };

  newHold.resource_metadata[`${req.body.resource_type}_title`] = req.body.title;
  newHold.resource_metadata[`${req.body.resource_type}_author`] = req.body.author || '';
  holdsForUser.push(newHold);
  holds[req.params.id] = holdsForUser;

  saveToFile(JSON.stringify(holds, 0, 2), () => {
    res.status(200).send({ success: true });
  });
});

module.exports = router;
