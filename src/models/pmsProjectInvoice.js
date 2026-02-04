import { Model } from "sequelize";
import { TABLES } from "../utils/constants.js";

export default (sequelize, DataTypes) => {
  class pmsProjectInvoice extends Model {
    static associate(models) {
      // ProjectInvoice → Project
      this.belongsTo(models.pmsProject, {
        foreignKey: "project_id",
        as: "project",
      });
    }
  }

  pmsProjectInvoice.init(
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

      project_no: {
        type: DataTypes.STRING(255),
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

      invoice_no: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },

      invoice_amount_pre_gst: {
        type: DataTypes.DECIMAL(15, 2),
      },

      invoice_amount_with_gst: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
      },

      received_amount: {
        type: DataTypes.DECIMAL(15, 2),
      },

      invoice_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },

      invoice_details: {
        type: DataTypes.TEXT,
      },

      invoice_img: {
        type: DataTypes.TEXT,
      },

      payment_status: {
        type: DataTypes.ENUM("0", "1", "2"),
        defaultValue: "0",
        comment: "0=Unpaid,1=Paid,2=Partial payment",
      },

      financial_year: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },

      admin_approve_status: {
        type: DataTypes.ENUM("0", "1", "2"),
        defaultValue: "1",
        comment: "0=pending,1=approved,2=rejected",
      },

      finance_approve_status: {
        type: DataTypes.ENUM("0", "1", "2"),
        defaultValue: "0",
        comment: "0=pending,1=approved,2=rejected",
      },

      purchase_approve_status: {
        type: DataTypes.ENUM("0", "1", "2"),
        defaultValue: "1",
        comment: "0=pending,1=approved,2=rejected",
      },

      invoice_billing_status: {
        type: DataTypes.ENUM("0", "1"),
        defaultValue: "0",
        comment: "0=No,1=Yes",
      },

      invoice_payment_status: {
        type: DataTypes.ENUM("0", "1", "2"),
        allowNull: false,
        comment: "0=Unpaid,1=Paid,2=Partial payment (Invoice)",
      },

      status: {
        type: DataTypes.ENUM("0", "1", "2", "3"),
        defaultValue: "0",
        comment: "0=pending,1=approved,2=rejected,3=deleted",
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
      modelName: "pmsProjectInvoice",
      tableName: TABLES.PROJECT_INVOICES_TABLE || "project_invoices",
      timestamps: false, // DB handles timestamps
    },
  );

  return pmsProjectInvoice;
};
