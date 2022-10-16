const express = require('express');
const anomalyController = require('../../controllers/anomaly.controller');

const router = express.Router();

router.get('/all', anomalyController.getAnomalies);
router.post('/create', anomalyController.createAnomaly);
router.put('/update/:anomalyId', anomalyController.updateAnomaly);

module.exports = router;
