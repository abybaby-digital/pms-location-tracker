import { Model } from "sequelize";
import { TABLES } from "../utils/constants.js";

export default (sequelize, DataTypes) => {
  class pmsProject extends Model {
    static associate(models) {
      this.hasMany(models.pmsProjectInvoice, {
        foreignKey: "project_id",
        as: "projectInvoices",
      });
    }
  }

  pmsProject.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },

      project_number: {
        type: DataTypes.STRING(50),
      },

      client_po_no: {
        type: DataTypes.STRING(50),
      },

      project_name: {
        type: DataTypes.STRING(255),
      },

      client_id: {
        type: DataTypes.BIGINT,
      },

      branch_id: {
        type: DataTypes.BIGINT,
      },

      company_id: {
        type: DataTypes.BIGINT,
      },

      vertical_head_id: {
        type: DataTypes.STRING(255),
      },

      business_manager_id: {
        type: DataTypes.STRING(255),
      },

      client_service_id: {
        type: DataTypes.STRING(255),
      },

      other_members_id: {
        type: DataTypes.STRING(255),
      },

      activity_coordinator_id: {
        type: DataTypes.STRING(255),
      },

      activity_coordinator_other_id: {
        type: DataTypes.STRING(255),
      },

      fo_ids: {
        type: DataTypes.STRING(255),
      },

      fo_history_ids: {
        type: DataTypes.STRING(255),
      },

      fo_main_id: {
        type: DataTypes.STRING(255),
      },

      fo_main_history_id: {
        type: DataTypes.STRING(255),
      },

      fo_junior_id: {
        type: DataTypes.STRING(255),
      },

      fo_junior_history_id: {
        type: DataTypes.STRING(255),
      },

      team_id: {
        type: DataTypes.STRING(255),
      },

      quotation_no: {
        type: DataTypes.STRING(255),
      },

      project_amount_pre_gst: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
      },

      project_amount_with_gst: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
      },

      total_branch_expenses: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
      },

      branch_expenses_cash: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
      },

      branch_expenses_check: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
      },

      project_start_date: {
        type: DataTypes.DATEONLY,
      },

      project_end_date: {
        type: DataTypes.DATEONLY,
      },

      financial_year: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },

      billing_status: {
        type: DataTypes.ENUM("0", "1"),
        defaultValue: "0",
      },

      payment_status: {
        type: DataTypes.ENUM("0", "1"),
        defaultValue: "0",
      },

      invoice_billing_status: {
        type: DataTypes.ENUM("0", "1", "2"),
        defaultValue: "0",
        comment: "0=Not Generate,1=Generate,2=Partial Generate Invoice",
      },

      vh_prefix_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },

      status: {
        type: DataTypes.ENUM("0", "1", "2"),
        defaultValue: "1",
        comment: "0=cancelled,1=running,2=closed",
      },

      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },

      created_by: {
        type: DataTypes.BIGINT,
      },

      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },

      updated_by: {
        type: DataTypes.BIGINT,
      },
    },
    {
      sequelize,
      modelName: "pmsProject",
      tableName: TABLES.PROJECTS_TABLE || "projects",
      timestamps: false, // since table already has created_at & updated_at
    },
  );

  return pmsProject;
};
