const { Activity } = require('../db');

const findActivity = async (name) => {
    const activities =  await Activity.findAll( { where: { name } } );

    if (activities.length) return true;
    return false;
}

module.exports = findActivity;