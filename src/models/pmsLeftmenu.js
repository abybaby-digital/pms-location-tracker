import { Model } from "sequelize";
import { TABLES } from "../utils/constants.js";

export default (sequelize, DataTypes) => {
  class pmsLeftMenu extends Model {
    static associate(models) {
      // define associations here if needed in future
      // example:
      // this.hasMany(models.pmsPermission, { ... })
    }
  }

  pmsLeftMenu.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      menu_name: {
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
      modelName: "pmsLeftMenu",
      tableName: TABLES.LEFT_MENU_TABLE || "left_menus",
      timestamps: false,
    },
  );

  return pmsLeftMenu;
};
