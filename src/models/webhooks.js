'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Webhooks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Webhooks.init({
    city_id: DataTypes.INTEGER,
    callback_url: {type: DataTypes.STRING, isUrl:true}
  }, {
    sequelize,
    modelName: 'Webhooks',
  });
  return Webhooks;
};