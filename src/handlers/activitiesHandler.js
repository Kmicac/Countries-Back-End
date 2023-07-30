const {  getAllActivity } = require('../controllers/activitysController' );

const getAllActivitiesHandler = async (req, res) => {
    try {
        const activities = await getAllActivity();
        res.status(200).json(activities);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


/*
const createActivityHandler = async (req, res) => {
    const { countries, name, difficulty, durations, seasons } = req.body;
    console.log(req.body);

    try {

        const activityCreated = await createActivity({ countries, name, difficulty, durations, seasons });
        console.log('Esto no cuela papi');
        res.status(200).json(activityCreated);
    
    } catch (error) {
        res.status(400).json({ error:"no llega el msj" });
    }
};
*/



module.exports = {
    getAllActivitiesHandler
};