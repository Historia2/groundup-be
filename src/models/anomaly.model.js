const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const autoIncrement = require('mongoose-auto-increment');
const { roles } = require('../config/roles');

const anomalySchema = mongoose.Schema(
  {
    equipment: {
      type: String,
      required: true,
      trim: true,
    },
    anomalyFile: {
      type: String,
      required: true,
      trim: true,
    },
    normalFile: {
      type: String,
      required: true,
      trim: true,
    },
    detectionTime: {
      type: Date,
      set: d => new Date(d * 1000)
    },
    alertType: {
      type: String,
      required: true,
      trim: true,
    },
    reason: {
      type: String,
      trim: true,
    },
    action: {
      type: String,
      trim: true,
    },
    comments: {
      type: String,
      trim: true,
    },
    sensor: {
      type: String,
      required: true,
      trim: true,
    },
    new: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
  }
);
autoIncrement.initialize(mongoose.connection);
// add plugin that converts mongoose to json
anomalySchema.plugin(toJSON);
anomalySchema.plugin(paginate);
anomalySchema.plugin(autoIncrement.plugin, 'Anomaly');
// anomalySchema.index({_id : 1}, {unique : true});
/**
 * @typedef Anomaly
 */
const Anomaly = mongoose.model('Anomaly', anomalySchema);
module.exports = Anomaly;
