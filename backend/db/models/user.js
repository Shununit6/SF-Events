'use strict';
const { Model, Validator } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
      User.hasMany(models.Group, { foreignKey: "organizerId" });
      User.belongsToMany(
        models.Group,
        {
          through: models.Membership,
          foreignKey: 'userId',
          otherKey: 'groupId'
        }
      );
      User.belongsToMany(
        models.Event,
        {
          through: models.Attendee,
          foreignKey: 'userId',
          otherKey: 'eventId'
        }
      );
    }
    static async signup ({ username, email}){
      const existingEmail = await User.findOne({
        where: {
            email
        }
      });
      if(existingEmail){
        return "email";
      }
      const existingUser = await User.findOne({
        where: {
            username
        }
      });
      if(existingUser){
        return "username";
      }
    }
  }
  User.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 30],
        isNotEmail(value) {
          if (Validator.isEmail(value)) {
            throw new Error("Cannot be an email.");
          }
        }
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 30],
        isNotEmail(value) {
          if (Validator.isEmail(value)) {
            throw new Error("Cannot be an email.");
          }
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 256],
        isEmail: true,
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [4, 30],
        isNotEmail(value) {
          if (Validator.isEmail(value)) {
            throw new Error("Cannot be an email.");
          }
        }
      }
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
      validate: {
        len: [60, 60]
      }
    },
  }, {
    sequelize,
    modelName: 'User',
    defaultScope: {
      attributes: {
        exclude: ["firstName", "lastName", "hashedPassword", "email", "createdAt", "updatedAt"]
      }
    }
  });
  return User;
};
