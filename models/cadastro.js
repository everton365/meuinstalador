'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cadastro extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  cadastro.init({
    nome: DataTypes.STRING,
    cpf: DataTypes.STRING,
    endereco: DataTypes.STRING,
    cidade: DataTypes.STRING,
    estado: DataTypes.STRING,
    empresa: DataTypes.STRING,
    telefone: DataTypes.STRING,
    latitude: DataTypes.DOUBLE, // 9 dígitos no total, 6 casas decimais
    longitude: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'cadastro',
  });
  return cadastro;
};