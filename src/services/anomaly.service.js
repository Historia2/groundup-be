const httpStatus = require('http-status');
const { Anomaly } = require('../models');
const ApiError = require('../utils/ApiError');


/**
 * Create an anomaly
 * @param {Object} userBody
 * @returns {Promise<Anomaly>}
 */
 const createAnomaly = async (userBody) => {
  return Anomaly.create(userBody);
};
/**
 * Query for Anomalies
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryAnomalies = async (filter, options) => {
  const Anomalies = await Anomaly.paginate(filter, options);
  return Anomalies;
};

/**
 * Get anomaly by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
 const getAnomalyById = async (id) => {
  return Anomaly.findById(id);
};
/**
 * Update anomaly by id
 * @param {ObjectId} anomalyId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
 const updateAnomalyById = async (anomalyId, updateBody) => {
  const anomaly = await getAnomalyById(anomalyId);
  if (!anomaly) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Anomaly not found');
  }

  Object.assign(anomaly, updateBody);
  await anomaly.save();
  return anomaly;
};
module.exports = {
  queryAnomalies,
  createAnomaly,
  updateAnomalyById
};
