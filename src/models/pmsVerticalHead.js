import { Model } from "sequelize";
import { TABLES } from "../utils/constants.js";

export default (sequelize, DataTypes) => {
  class pmsVerticalHead extends Model {
    static associate(models) {
      // define associations here if required
    }
  }

  pmsVerticalHead.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },

      name_prefix: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },

      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },

      status: {
        type: DataTypes.ENUM("0", "1", "2"),
        allowNull: false,
        defaultValue: "1",
        comment: "0=pending, 1=active, 2=deleted",
      },

      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },

      updated_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "pmsVerticalHead",
      tableName: TABLES.VERTICAL_HEAD_TABLE || "vertical_heads",
      timestamps: false,
      underscored: true,
    },
  );

  return pmsVerticalHead;
};
