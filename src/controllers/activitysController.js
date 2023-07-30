const { Activity, Country } = require('../db');
const findActivity = require('../middlewares/validateActivityName');


const getAllActivity = async () => {
    return Activity.findAll();
}
const createActivity = async (req, res) => {
    const { countries, name, difficulty, durations, seasons } = req.body;

        try {
            // Primero verifica si la actividad existe en la base de datos...
            const activityExists = await findActivity(name);
            if (activityExists) {
                return res.status(400).json({ error: 'Activity already exists' });
              }

              // Si no existe procede a crear la actividad...
                const getActivity = await Activity.create({
                    name,
                    difficulty,
                    durations,
                    seasons
                });
        // Recupero los paises de la base de datos asociados con la actividad..
                const recuperoCountries = await Country.findAll({
                    where: {
                        name: countries 
                    }
                });

            await getActivity.setCountries(recuperoCountries);
            res.status(200).json({ message: 'Activity created successfully',
            activity: getActivity
            });
     
   } catch (error) {
      console.error('Error creating activity:', error);
      res.status(500).json({ error: 'Failed to create activity' });
  }
 };
   

module.exports = {
    getAllActivity,
    createActivity
};