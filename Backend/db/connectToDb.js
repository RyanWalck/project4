const mongoose = require('mongoose');

const connecToDB = (url) => {
  mongoose.connect(url);
};

module.exports = connecToDB;
