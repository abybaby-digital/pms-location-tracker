import { Model } from "sequelize";
import { TABLES } from "../utils/constants.js";

export default (sequelize, DataTypes) => {
  class pmsState extends Model {
    static associate(models) {
      // One State has many Users
      this.hasMany(models.pmsUser, {
        foreignKey: "state_id",
        sourceKey: "id",
        as: "users",
      });
    }
  }

  pmsState.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },

      state_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },

      status: {
        type: DataTypes.ENUM("0", "1", "2"),
        defaultValue: "1",
        comment: "0=inactive, 1=active, 2=deleted",
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
      modelName: "pmsState",
      tableName: TABLES.STATE_TABLE || "states",
      timestamps: false,
    },
  );

  return pmsState;
};
