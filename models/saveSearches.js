module.exports = function(sequelize, DataTypes) {
    var saveSearch = sequelize.define("saveSearch", {
      school: {
        type: DataTypes.STRING,
        allowNull: false
      }
    });
  
    saveSearch.associate = function(models) {
      saveSearch.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      });
    };
  
    return saveSearch;
  };
  