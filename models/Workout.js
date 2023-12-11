const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/connection')

class Workout extends Model {}

Workout.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    bodyPart: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    equipment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gifUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    target: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    secondaryMuscles: {
      type: DataTypes.STRING,
      allowNull: true,
      get() {
        return this.getDataValue('secondaryMuscles')
          ? JSON.parse(this.getDataValue('secondaryMuscles'))
          : [];
      },
      set(val) {
        this.setDataValue('secondaryMuscles', val ? JSON.stringify(val) : null);
      },
    }
  },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'workoutPlan'
    }
)
module.exports = Workout