const { Model, DataTypes } = require('sequelize')
const bcypt = require('bcrypt')
const sequelize = require('../config/connection')

class User extends Model {
    checkPassword(testPass){
        return bcypt.compareSync(testPass, this.password)
    }
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8, 15]
            }
        }
    },
    {
        hooks: {
            beforeCreate: async (newUser) => {
                newUser.password = await bcypt.hash(newUser.password, 10)
            },
            beforeUpdate: async (updateUser) => {
                updateUser.password = await bcypt.hash(updateUser.password, 10)
            }
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user'
    }
)
module.exports = User