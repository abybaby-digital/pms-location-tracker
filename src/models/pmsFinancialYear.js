import { Model } from "sequelize";
import { TABLES } from "../utils/constants.js";

export default (sequelize, DataTypes) => {
  class pmsFinancialYear extends Model {
    static associate(models) {
      // define associations if needed later
      // example:
      // this.hasMany(models.pmsProject, { foreignKey: "financial_year" });
    }
  }

  pmsFinancialYear.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },

      financial_year: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },

      status: {
        type: DataTypes.ENUM("0", "1", "2"),
        defaultValue: "1",
        comment: "0=inactive,1=active,2=deleted",
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
      modelName: "pmsFinancialYear",
      tableName: TABLES.FINANCIAL_YEARS_TABLE || "financial_years",
      timestamps: false, // DB handles timestamps
    }
  );

  return pmsFinancialYear;
};
