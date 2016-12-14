import fs from 'fs';
import path from 'path';
let basename = path.basename(module.filename);
import Sequelize from 'sequelize';

let config = require('../../config.json');
let db = {};

let sequelize = new Sequelize(
    config.db_config.database,
    config.db_config.username,
    config.db_config.password,
    {
        "host": config.db_config.host,
        "dialect": config.db_config.dialect,
        "logging": config.db_config.logging,
    });

fs
    .readdirSync(__dirname)
    .filter(function(file) {
        return (file.indexOf('.') !== 0) && (file !== basename);
    })
    .forEach(function(file) {
        if (file.slice(-3) !== '.js') return;
        var model = sequelize['import'](path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(function(modelName) {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

// sequelize.sync({force:true});
sequelize.sync();
db.sequelize = sequelize;
db.Sequelize = Sequelize;
export default db;