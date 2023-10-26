const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
   sequelize.define('videogame', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        len: [1, 100]
      }
    },
    description:{
      type: DataTypes.TEXT,
      allowNull: false,
    },
    platforms:{
      type:DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    image:{
      type :DataTypes.STRING,
      validate:{
        isUrl: true
      }
    },
    releaseDate:{
      type: DataTypes.DATE,
    },
    rating:{
      type: DataTypes.FLOAT,
      validate: {
        min: 0,
        max: 5
      }
    }
  });
    
};
