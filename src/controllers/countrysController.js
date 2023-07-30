const axios = require('axios');
const { Op } = require('sequelize')
const { Country, Activity } = require('../db');


// Buscamos la Data de los paisses en la Api para luego mappearla con los datos que solo necesitamos de la Api, la guardamos 
// en la variable cleanData para luego utilizar la misma en el trnaslado a la DB..
const getApiData = async () => {
    try {
        const countriesApi = await axios.get('https://restcountries.com/v3.1/all/').then(response =>
         response.data);

        const cleanData = countriesApi.map(country => ({
            id: country.cca3,
            name: country.name.common,
            flags: country.flags.svg,
            continent: country.region,
            capital: country.capital?.[0] || 'Not Capital Found',
            subregion: country.subregion,
            area: Number(country.area),
            population: Number(country.population)
        }));

        return cleanData;

    } catch (error) {
        return { error: error.message };
    }


};

// De aqui obtenemos la data mappeada y la guardamos en la Base de Datos Countries..
const saveDataApiIntoDb = async () => {
    try {
        const cleanData = await getApiData();
        await Country.bulkCreate(cleanData);
        return cleanData;

    } catch (error) {
        return { error: error.message };
    }
};


// Funcion para la obtencion de todos los paises desde la base de datos..
const getAllCountries = async () => {
    const countries =  await Country.findAll(
    {
        attributes: ['id', 'name', 'flags', 'continent', 'capital', 'area', 'population'],
        include: [
            {
                model: Activity,
                attributes: ['name'],
            }
        ]
    }
 )
    return countries;     
};

// Funcion para obtener el pais por nombre..
const getCountryByName = async (name) => {
  const countryName = await Country.findAll({
        where: {
            name: {
                [Op.iLike]: `%${name}%`
            }
        }
    })
    return countryName;
};

// Funcion para la obtencion de pais atravez de su Id..
const getCountryById = async (id) => {
const countryId = await Country.findByPk(id, {
   includes: 
     {
        model: Activity,
        attributes: ['id, name, difficulty, duration, season']
    }
})
 return countryId;
};

 // exportamos todas las funciones que utilizaremos en otros componentes...
    module.exports = { 
        saveDataApiIntoDb,
        getApiData,
        getAllCountries,
        getCountryByName,
        getCountryById
    };