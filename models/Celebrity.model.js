const { Schema, model } = require('mongoose');

const celebritiesSchema = new Schema(
  {
    name: String,
    occupation: String,
    catchphrase: String,
  },
  {
    timestamps: true,
  },
);

const Celebrities = model('Celebrities', celebritiesSchema);

module.exports = Celebrities;
