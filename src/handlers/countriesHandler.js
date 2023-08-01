const { getAllCountries, getCountryByName, getCountryById, saveDataApiIntoDb, getApiData} = require('../controllers/countrysController');

const getCountryHandler = async (req, res) => {
    try {
        const { name } = req.query;

        if(saveDataApiIntoDb.length === 0) {
            await getApiData();
            await saveDataApiIntoDb();
        }
        if (name) { 
            const countryByName = await getCountryByName(name);
            return res.status(200).json(countryByName);
            
        }
        const response = await getAllCountries();
        return res.status(200).json(response);  
    
     } catch (error) {
        res.status(400).json({error: error.message})
    }
};

const getCountryIdHandler = async (req, res) => {
    const { id } = req.params;
    try {
            const countryById = await getCountryById(id);
            res.status(200).json(countryById);
       
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

module.exports = {
    getCountryHandler,
    getCountryIdHandler
};
