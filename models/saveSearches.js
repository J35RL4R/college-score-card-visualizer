module.exports = function(sequelize, DataTypes) {
    var saveSearch = sequelize.define("saveSearch", {
      school: {
        type: DataTypes.STRING,
        allowNull: false
      }
    });
  
    saveSearch.associate = function(models) {
      // We're saying that a Post should belong to an Author
      // A Post can't be created without an Author due to the foreign key constraint
      saveSearch.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      });
    };
  
    return saveSearch;
  };
  