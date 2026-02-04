import { Model } from "sequelize";
import { TABLES } from "../utils/constants.js";

export default (sequelize, DataTypes) => {
  class UserCheckin extends Model {}

  UserCheckin.init(
    {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },

      user_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        unique: true,
      },

      location_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
      },

      checkin_latitude: {
        type: DataTypes.DECIMAL(10, 8),
        allowNull: false,
      },

      checkin_longitude: {
        type: DataTypes.DECIMAL(11, 8),
        allowNull: false,
      },

      checkout_latitude: {
        type: DataTypes.DECIMAL(10, 8),
        allowNull: true,
      },

      checkout_longitude: {
        type: DataTypes.DECIMAL(11, 8),
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM("0", "1"),
        allowNull: false,
        defaultValue: "1", // 1 = active
      },

      checkin_time: {
        type: DataTypes.DATE,
        allowNull: false,
      },

      checkout_time: {
        type: DataTypes.DATE,
        allowNull: true,
      },

      current_status: {
        type: DataTypes.ENUM("CHECK_IN", "CHECK_OUT"),
        allowNull: false,
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
      modelName: "user_checkins",
      tableName: TABLES.USER_CHECKINS_TABLE || "user_checkins",
      timestamps: false,
      underscored: true,
      engine: "InnoDB",

      indexes: [
        { fields: ["user_id"] },
        { fields: ["location_id"] },
        { fields: ["status"] },
        { fields: ["checkin_time"] },
      ],
    },
  );

  UserCheckin.associate = (models) => {
    UserCheckin.belongsTo(models.pmsUser, {
      foreignKey: "user_id",
      as: "user",
    });

    UserCheckin.belongsTo(models.pmsLocation, {
      foreignKey: "location_id",
      targetKey: "id",
      as: "location",
    });
  };

  return UserCheckin;
};
