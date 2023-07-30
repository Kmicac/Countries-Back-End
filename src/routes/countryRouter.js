const { Router } = require('express');
const { getCountryHandler, getCountryIdHandler } = require('../handlers/countriesHandler');

const router = Router();

router.get('/', getCountryHandler);

router.get('/:id', getCountryIdHandler);

module.exports = router;
