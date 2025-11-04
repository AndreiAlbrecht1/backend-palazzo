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
          onDelete: 'CASCADE',
        },
        listingId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'Listings',
            key: 'id',
          },
          onDelete: 'CASCADE',
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
      as: 'user',
    });

    this.belongsTo(models.Listing, {
      foreignKey: 'listingId',
      as: 'listing',
    });
  }
}

export default Favorite;
