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

const Celebrities = model('Celebrities', celebritiesSchema);

module.exports = Celebrities;
