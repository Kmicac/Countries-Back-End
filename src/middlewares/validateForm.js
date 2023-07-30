
const validateActivity = async (req, res, next) => {
   
    const { countries, name, difficulty, durations, seasons } = req.body;

    if (!name || !difficulty || !durations || !seasons || !countries)  {

        res.status(400).json({ error: 'Missing required fields' });
    } 
    
    next();
}

module.exports = validateActivity;