'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class orçamento extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  orçamento.init({
    nome: DataTypes.STRING,
    estado: DataTypes.STRING,
    cidade: DataTypes.STRING,
    telefone: DataTypes.STRING,
    email: DataTypes.STRING,
    modelo: DataTypes.STRING,
    ano: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'orçamento',
  });
  return orçamento;
};