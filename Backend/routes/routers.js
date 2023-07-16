const express = require('express');
const router = express.Router();


const {
  getRace,
  getAllRace,
  updateRace,
  deleteRace,
  createRace,
} = require('../controllers/raceCarsApis');

router.route('/').get(getAllRace).post(createRace);
router.route('/:id').get(getRace).put(updateRace).delete(deleteRace);

module.exports = router;
