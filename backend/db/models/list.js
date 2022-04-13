'use strict';

module.exports = (sequelize, DataTypes) => {
  const List = sequelize.define('List', {
    userId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    type: DataTypes.STRING,
    image: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {});
  List.associate = function(models) {
    List.belongsTo(models.User, { foreignKey: 'userId' });

  };
  return List;
};
