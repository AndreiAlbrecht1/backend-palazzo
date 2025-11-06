import { Model, DataTypes } from 'sequelize';

class Listing extends Model {
  static init(sequelize) {
    super.init(
      {
        title: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        price: {
          type: DataTypes.BIGINT,
          allowNull: false,
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        city: DataTypes.STRING,
        neighborhood: DataTypes.STRING,
        region: DataTypes.STRING,
        country: DataTypes.STRING,
        bedrooms: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        bathrooms: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        squareMeters: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        images: {
          type: DataTypes.ARRAY(DataTypes.STRING),
          allowNull: false,
          defaultValue: [],
        },
        contactPhone: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        contactEmail: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            isEmail: true,
          },
        },
      },
      {
        sequelize,
        modelName: 'Listing',
        tableName: 'Listings',
        timestamps: true,
      },
    );
  }

  static associate(models) {
    this.belongsToMany(models.User, {
      through: 'Favorites',
      foreignKey: 'listingId',
      as: 'FavoritedByUsers',
    });
  }
}

export default Listing;
