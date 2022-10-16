const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { anomalyService } = require('../services');

const createAnomaly = catchAsync(async (req, res) => {
  console.log(req.body, 'req.body');
  const anomaly = await anomalyService.createAnomaly(req.body);
  res.status(httpStatus.CREATED).send(anomaly);
});

const getAnomalies = catchAsync(async (req, res) => {
  const filter = pick(req.query, []);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await anomalyService.queryAnomalies(filter, options);
  res.send(result);
});

const updateAnomaly = catchAsync(async (req, res) => {
  const user = await anomalyService.updateAnomalyById(req.params.anomalyId, req.body);
  res.send(user);
});

module.exports = {
  getAnomalies,
  createAnomaly,
  updateAnomaly
};
