import { Model } from "sequelize";
import { TABLES } from "../utils/constants.js";

export default (sequelize, DataTypes) => {
  class location_types extends Model {
    // static associate(models) {
    //   // One Branch has many Users
    //   this.hasMany(models.pmsUser, {
    //     foreignKey: "branch_id",
    //     sourceKey: "id",
    //     as: "users",
    //   });
    // }
  }

  location_types.init(
    {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },

      location_type_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },

      status: {
        type: DataTypes.ENUM("0", "1", "2"),
        allowNull: false,
        defaultValue: "1", // 1 = active
      },

      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },

      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      created_by: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
      },
      updated_by: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "location_types",
      tableName: TABLES.LOCATION_TYPE_TABLE || "location_types",
      timestamps: false,
    },
  );

  return location_types;
};
