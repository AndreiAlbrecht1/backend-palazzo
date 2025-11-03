import { Model, DataTypes } from 'sequelize';

class Favorite extends Model {
  static init(sequelize) {
    super.init(
      {
        userId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'Users',
            key: 'id',
          },
        },
        listingId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'Listings',
            key: 'id',
          },
        },
      },
      {
        sequelize,
        modelName: 'Favorite',
        tableName: 'Favorites',
        timestamps: true,
      },
    );
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: 'userId',
    });

    this.belongsTo(models.Listing, {
      foreignKey: 'listingId',
    });
  }
}

export default Favorite;
