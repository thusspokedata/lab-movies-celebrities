const { Schema, model } = require('mongoose');

const celebritiesSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    occupation: String,
    catchphrase: String,
  },
  {
    timestamps: true,
  },
);

const Celebrity = model('Celebrity', celebritiesSchema);

module.exports = Celebrity;
