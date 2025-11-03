import { Sequelize } from 'sequelize';
import databaseConfig from '../../shared/config/database.js';
import User from '../../domain/models/User.js';
import Listing from '../../domain/models/Listing.js';
import Favorite from '../../domain/models/Favorite.js';

const models = [User, Listing, Favorite];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.forEach((model) => {
      model.init(this.connection);
      if (model.associate) {
        model.associate(this.connection.models);
      }
    });
  }
  getQueryInterface() {
    if (!this.connection) throw new Error('Database not connected.');
    return this.connection.getQueryInterface();
  }
}

export default new Database();
