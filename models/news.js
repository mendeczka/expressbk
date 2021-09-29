// import mongoose from 'mongoose';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// const { Schema } = mongoose;


  const newsSchema = new Schema({
    // title: String, // String is shorthand for {type: String}
    title: { type: String, required: [true, 'Pole tytuł jest wymagane'] },
    description: { type: String, required: [true, 'Pole opis jest wymagane'] },
    created: { type: Date, default: Date.now },
  });

module.exports = mongoose.model('News', newsSchema);