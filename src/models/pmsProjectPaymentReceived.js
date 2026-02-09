import { Model } from "sequelize";
import { TABLES } from "../utils/constants.js";

export default (sequelize, DataTypes) => {
  class pmsProjectPaymentReceived extends Model {
    static associate(models) {
      // Associations can be added later if needed
      // Example:
      // this.belongsTo(models.pmsProject, { foreignKey: "project_id" });
    }
  }

  pmsProjectPaymentReceived.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },

      project_id: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },

      project_no: {
        type: DataTypes.STRING(255),
        allowNull: true,
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

      received_no: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },

      received_amount: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
      },

      received_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },

      received_details: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      received_img: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      received_status: {
        type: DataTypes.ENUM("0", "1", "2"),
        allowNull: false,
        defaultValue: "0",
        comment: "0=Unpaid, 1=Paid, 2=Partial payment",
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
        allowNull: true,
      },

      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },

      updated_by: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "pmsProjectPaymentReceived",
      tableName:
        TABLES.PROJECT_PAYMENT_RECEIVED_TABLE || "project_payment_received",
      timestamps: false,
      underscored: true,
    }
  );

  return pmsProjectPaymentReceived;
};
