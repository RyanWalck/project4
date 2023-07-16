
const raceShcemas = require('../models/racersScheme');


const getAllRacers = async (req, res) => {
  try {
    const allRacers = await raceShcemas.find({});
    res.status(200).json({ allRacers });
  } catch (error) {
    res.status(500).json({ success: false, msg: error });
  }
};


const addRacer = async (req, res) => {
  try {
    const racer = await raceShcemas.create(req.body);
    res.status(201).json({ racer });
  } catch (error) {
    res.status(500).json({ success: false, msg: error });
  }
};

const getRacer = async (req, res) => {
  try {
    const racerID = req.params.id;
    const racer = await raceShcemas.findOne({ _id: racerID });
    if (!racer) {
      return res.status(404).json({ msg: `No Race with the id: ${racerID}` });
    }
    res.status(200).json({ racer });
  } catch (error) {
    res.status(500).json({ success: false, msg: error });
  }
};


const updateRacer = async (req, res) => {
  try {
    const racerID = req.params.id;
    const racer = await raceShcemas.findOneAndUpdate(
      { _id: racerID },
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!racer) {
      return res.status(404).json({ msg: `No Race with the id: ${racerID}` });
    }

    res.status(200).json({ racer });
  } catch (error) {
    res.status(500).json({ success: false, msg: error });
  }
};


const deleteRacer = async (req, res) => {
  try {
    const racerID = req.params.id;
    const racer = await raceShcemas.findOneAndDelete({ _id: racerID });
    if (!racer) {
      return res.status(404).json({ msg: `No Race with the id: ${racerID}` });
    }

    res.status(200).send();
  } catch (error) {
    res.status(500).json({ success: false, msg: error });
  }
};


module.exports = { getAllRacers, getRacer, addRacer, deleteRacer, updateRacer };
