const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define( 'activity', {
        id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        difficulty: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
            validate: {
                min: 1,
                max: 5
            }
        },
        durations:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        seasons: {
            type: DataTypes.ENUM('summer', 'autumn', 'winter', 'spring'),
            allowNull: true,
        },

    },
    { timestamps: false } ); 
};