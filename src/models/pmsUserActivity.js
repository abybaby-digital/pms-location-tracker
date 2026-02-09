import { Model } from "sequelize";
import { TABLES } from "../utils/constants.js";

export default (sequelize, DataTypes) => {
  class pmsUser_activities extends Model {
    static associate(models) {
      this.belongsTo(models.pmsLocation, {
        foreignKey: "location_id",
        as: "location",
      });

      this.belongsTo(models.pmsUser, {
        foreignKey: "user_id",
        as: "user",
      });
    }
  }

  pmsUser_activities.init(
    {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },

      user_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
      },

      location_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
      },

      activity_type: {
        type: DataTypes.TINYINT.UNSIGNED,
        allowNull: false,
      },

      activity_time: {
        type: DataTypes.DATE,
        allowNull: false,
      },

      status: {
        type: DataTypes.ENUM("0", "1"),
        defaultValue: "1",
      },

      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "pmsUser_activities",
      tableName: TABLES.USER_ACTIVITIES_TABLE || "user_activities",
      timestamps: false,
      underscored: true,
    },
  );

  return pmsUser_activities;
};
