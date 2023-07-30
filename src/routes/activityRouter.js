const{ Router } = require('express');
const { createActivity } = require('../controllers/activitysController');
const { getAllActivitiesHandler } = require('../handlers/activitiesHandler');
// const findActivity = require('../middlewares/validateActivityName');
const validateActivity = require('../middlewares/validateForm');

const router = Router();

router.get("/", getAllActivitiesHandler);

router.post("/", validateActivity, createActivity);



module.exports = router;