import { Model } from "sequelize";
import { TABLES } from "../utils/constants.js";

export default (sequelize, DataTypes) => {
  class pmsFoPaymentAllotment extends Model {}

  pmsFoPaymentAllotment.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      fo_payment_requisition_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      project_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },

      client_service_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },

      fo_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      alloted_amount: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
      },

      status: {
        type: DataTypes.ENUM("0", "1", "2"),
        defaultValue: "1",
        allowNull: false,
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
      },

      updated_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "pmsFoPaymentAllotment",
      tableName: TABLES.FO_PAYMENT_ALLOTMENT || "fo_payment_allotments",
      timestamps: false,
    },
  );

  pmsFoPaymentAllotment.associate = (models) => {
    pmsFoPaymentAllotment.belongsTo(models.foPaymentRequisition, {
      foreignKey: "fo_payment_requisition_id",
      as: "requisition",
    });

    pmsFoPaymentAllotment.belongsTo(models.project, {
      foreignKey: "project_id",
      as: "project",
    });

    pmsFoPaymentAllotment.belongsTo(models.clientService, {
      foreignKey: "client_service_id",
      as: "clientService",
    });

    pmsFoPaymentAllotment.belongsTo(models.user, {
      foreignKey: "fo_id",
      as: "fieldOfficer",
    });
  };

  return pmsFoPaymentAllotment;
};
