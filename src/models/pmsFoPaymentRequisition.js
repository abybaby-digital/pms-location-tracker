import { Model } from "sequelize";
import { TABLES } from "../utils/constants.js";

export default (sequelize, DataTypes) => {
  class pmsFoPaymentRequisition extends Model {
    static associate(models) {
      this.belongsTo(models.pmsProject, {
        foreignKey: "project_id",
        as: "project",
      });

      this.belongsTo(models.pmsBranch, {
        foreignKey: "branch_id",
        as: "branch",
      });

      this.belongsTo(models.pmsUser, {
        foreignKey: "assign_fo_id",
        as: "userFoData",
      });

      this.belongsTo(models.pmsUser, {
        foreignKey: "created_by",
        as: "userCreatedByData",
      });

      this.belongsTo(models.pmsUser, {
        foreignKey: "updated_by",
        as: "userUpdatedByData",
      });
    }
  }

  pmsFoPaymentRequisition.init(
    {
      id: {
        type: DataTypes.BIGINT,
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

      branch_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },

      vertical_head_id: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },

      business_manager_id: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },

      client_service_id: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },

      other_members_id: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },

      activity_coordinator_id: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },

      activity_coordinator_other_id: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },

      fo_ids: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },

      fo_main_id: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },

      fo_junior_id: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },

      team_id: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },

      requisition_amount: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
      },

      approved_amount: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: true,
      },

      requisition_remarks: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      fo_requisition_img: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      date_of_payments: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },

      assign_fo_id: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },

      admin_approve_status: {
        type: DataTypes.ENUM("0", "1", "2"),
        allowNull: false,
        defaultValue: "1",
        comment: "0=pending,1=approved,2=rejected",
      },

      finance_approve_status: {
        type: DataTypes.ENUM("0", "1", "2"),
        allowNull: false,
        defaultValue: "0",
        comment: "0=pending,1=approved,2=rejected",
      },

      purchase_approve_status: {
        type: DataTypes.ENUM("0", "1", "2"),
        allowNull: false,
        defaultValue: "1",
        comment: "0=pending,1=approved,2=rejected",
      },

      accountent_approve_status: {
        type: DataTypes.ENUM("0", "1", "2"),
        allowNull: false,
        defaultValue: "0",
        comment: "0=Unpaid,1=Paid,2=cancel",
      },

      financial_year: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },

      status: {
        type: DataTypes.ENUM("0", "1", "2"),
        allowNull: false,
        defaultValue: "1",
      },

      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },

      created_by: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },

      updated_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },

      updated_by: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "pmsFoPaymentRequisition",
      tableName: TABLES.FO_PAYMENT_REQUISITIONS || "fo_payment_requisitions",
      timestamps: false,
      underscored: true,
    },
  );

  return pmsFoPaymentRequisition;
};
