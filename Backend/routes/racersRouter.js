const express = require('express');
const router = express.Router();


const {
  getRacer,
  getAllRacers,
  updateRacer,
  deleteRacer,
  addRacer,
} = require('../controllers/bestRacersApis');

router.route('/').get(getAllRacers).post(addRacer);
router.route('/:id').get(getRacer).put(updateRacer).delete(deleteRacer);

module.exports = router;
