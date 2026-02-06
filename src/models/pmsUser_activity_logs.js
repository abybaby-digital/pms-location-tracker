import { Model } from "sequelize";
import { TABLES } from "../utils/constants.js";

export default (sequelize, DataTypes) => {
  class pmsUser_activity_logs extends Model {
    static associate(models) {
      this.belongsTo(models.pmsUserLocationSessions, {
        foreignKey: "session_id",
        as: "session",
      });

      this.belongsTo(models.pmsUser, {
        foreignKey: "user_id",
        as: "user",
      });

      this.belongsTo(models.pmsLocation, {
        foreignKey: "location_id",
        as: "location",
      });
    }
  }

  pmsUser_activity_logs.init(
    {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },

      session_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
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
        comment: "1=CHECKIN,0=CHECKOUT,3=AUTO_CHECKIN,4=AUTO_CHECKOUT,5=FORM_SUBMIT,6=FORM_UPDATE",
      },

      activity_source: {
        type: DataTypes.ENUM("MANUAL", "AUTO", "SYSTEM"),
        allowNull: false,
      },

      activity_time: {
        type: DataTypes.DATE,
        allowNull: false,
      },

      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "pmsUser_activity_logs",
      tableName: TABLES.USER_ACTIVITY_LOGS || "user_activity_logs",
      timestamps: false,
      underscored: true,
    },
  );

  return pmsUser_activity_logs;
};
