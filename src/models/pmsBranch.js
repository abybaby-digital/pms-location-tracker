import { Model } from "sequelize";
import { TABLES } from "../utils/constants.js";

export default (sequelize, DataTypes) => {
  class branch extends Model {
    static associate(models) {
      // One Branch has many Users
      this.hasMany(models.pmsUser, {
        foreignKey: "branch_id",
        sourceKey: "id",
        as: "users",
      });
    }
  }

  branch.init(
    {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },

      branch_code: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },

      branch_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },

      branch_address: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      state_id: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },

      status: {
        type: DataTypes.ENUM("0", "1", "2"),
        defaultValue: "1",
        comment: "0=inactive, 1=active, 2=deleted",
      },

      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },

      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "branch",
      tableName: TABLES.BRANCH_TABLE || "branches", // fixed typo
      timestamps: false,
    },
  );

  return branch;
};
