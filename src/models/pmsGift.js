import { Model } from "sequelize";
import { TABLES } from "../utils/constants.js";

export default (sequelize, DataTypes) => {
  class pmsGift extends Model {
    static associate(models) {
    }
  }

  pmsGift.init(
    {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },

      gift_name: {
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
        allowNull: false,
      },

      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "pmsGift",
      tableName: TABLES.PMS_GIFT_TABLE || "gifts",
      timestamps: false,
    }
  );

  return pmsGift;
};
