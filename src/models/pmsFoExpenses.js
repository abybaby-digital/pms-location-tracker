import { Model } from "sequelize";
import { TABLES } from "../utils/constants.js";

export default (sequelize, DataTypes) => {
  class pmsFoExpenses extends Model {
    // No associations or relations
  }

  pmsFoExpenses.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },

      project_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },

      project_number: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },

      team_id: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },

      fo_payment_requisition_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },

      fo_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      exp_reason: {
        type: DataTypes.TEXT,
        allowNull: false,
      },

      exp_amount: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
      },

      exp_attachment: {
        type: DataTypes.TEXT,
        allowNull: true,
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

      created_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      updated_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
      },

      updated_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "pmsFoExpenses",
      tableName: TABLES.EXPENSE_REQUISITION_TABLE || "fo_expenses_amounts",
      timestamps: false,
      underscored: true,
    },
  );

  return pmsFoExpenses;
};
