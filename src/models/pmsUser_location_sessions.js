import { Model } from "sequelize";
import { TABLES } from "../utils/constants.js";

export default (sequelize, DataTypes) => {
  class pmsUser_location_sessions extends Model {
    static associate(models) {
      this.belongsTo(models.pmsUser, {
        foreignKey: "user_id",
        as: "user",
      });

      this.belongsTo(models.pmsLocation, {
        foreignKey: "location_id",
        as: "location",
      });

      this.hasMany(models.pmsUser_activitiesLog, {
        foreignKey: "session_id",
        as: "logs",
        onDelete: "CASCADE",
      });
    }
  }

  pmsUser_location_sessions.init(
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

      activity_status: {
        type: DataTypes.ENUM("ACTIVE", "CLOSED"),
        defaultValue: "ACTIVE",
      },

      status: {
        type: DataTypes.ENUM("0", "1"),
        defaultValue: "1",
      },
      manual_checkin_time: {
        type: DataTypes.DATE,
        allowNull: false,
      },

      manual_checkout_time: {
        type: DataTypes.DATE,
        allowNull: true,
      },

      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },

      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "pmsUser_location_sessions",
      tableName: TABLES.USER_LOCATION_SESSIONS || "user_location_sessions",
      timestamps: false,
      underscored: true,
    },
  );

  return pmsUser_location_sessions;
};
