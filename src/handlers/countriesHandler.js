const { getAllCountries, getCountryByName, getCountryById, saveDataApiIntoDb, getApiData} = require('../controllers/countrysController');

const getCountryHandler = async (req, res) => {
    try {
        const { name } = req.query;
       if (name) {
        try {
            const countryByName = await getCountryByName(name);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(countryByName));
            
            } catch (error) {
               return res.status(400).json({ error: 'Country not found' });  
            }                   
       }
       if(saveDataApiIntoDb.length === 0) {
          await getApiData();
          await saveDataApiIntoDb();
          const response = await getAllCountries();
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(response));
       }
       else {
        return res.status(400).json({ error: 'Data alredy charge into DataBase' });
    }
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
