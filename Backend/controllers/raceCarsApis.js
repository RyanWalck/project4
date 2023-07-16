const raceShcemas = require('../models/mongooseSchemas');

const getAllRace = async (req, res) => {
  try {
    const allRace = await raceShcemas.find({});
    res.status(200).json({ allRace });
  } catch (error) {
    res.status(500).json({ success: false, msg: error });
  }
};


const createRace = async (req, res) => {
  try {
    const race = await raceShcemas.create(req.body);
    res.status(201).json({ race });
  } catch (error) {
    res.status(500).json({ success: false, msg: error });
  }
};


const getRace = async (req, res) => {
  try {
    const raceID = req.params.id;
    const race = await raceShcemas.findOne({ _id: raceID });
    if (!race) {
      return res.status(404).json({ msg: `No Race with the id: ${raceID}` });
    }
    res.status(200).json({ race });
  } catch (error) {
    res.status(500).json({ success: false, msg: error });
  }
};

const updateRace = async (req, res) => {
  try {
    const raceID = req.params.id;
    const race = await raceShcemas.findOneAndUpdate({ _id: raceID }, req.body, {
      new: true,
      runValidators: true,
    });

  
    if (!race) {
      return res.status(404).json({ msg: `No Race with the id: ${raceID}` });
    }
    res.status(200).json({ race });
  } catch (error) {
    res.status(500).json({ success: false, msg: error });
  }
};

const deleteRace = async (req, res) => {
  try {
    const raceID = req.params.id;
    const race = await raceShcemas.findOneAndDelete({ _id: raceID });
    if (!race) {
      return res.status(404).json({ msg: `No Race with the id: ${raceID}` });
    }

    res.status(200).send();
  } catch (error) {
    res.status(500).json({ success: false, msg: error });
  }
};


module.exports = { getAllRace, getRace, createRace, deleteRace, updateRace };
