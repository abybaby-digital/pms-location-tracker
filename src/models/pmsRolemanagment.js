import { Model } from "sequelize";
import { TABLES } from "../utils/constants.js";

export default (sequelize, DataTypes) => {
  class roleManagment extends Model {}

  roleManagment.init(
    {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      role_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },

      access_type_add: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      access_type_edit: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      access_type_list: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      status: {
        type: DataTypes.ENUM("0", "1", "2"),
        allowNull: false,
        defaultValue: "1", // 1 = active
      },

      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },

      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "role_managements",
      tableName: TABLES.ROLE_MANAGEMENT_TABLE || "role_managements", // ✅ exact DB table name
      timestamps: false, // DB handles timestamps
      underscored: true, // snake_case columns
    },
  );

  roleManagment.associate = (models) => {
    roleManagment.hasMany(models.pmsUser, {
      foreignKey: "role_id",
      sourceKey: "id",
      as: "users",
    });
  };

  return roleManagment;
};
