import { bcrypt } from 'bcrypt';
import Sequelize from 'sequelize';

module.exports = function (sequelize, DataTypes) {
    let user = sequelize.define('user', {
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: true
        },
        password: {
            type: Sequelize.STRING,
            set: function (v) {
                var salt = bcrypt.genSaltSync(10);
                var hash = bcrypt.hashSync(v, salt);

                this.setDataValue('password', hash);
            }
        }
    });

    return user;
};