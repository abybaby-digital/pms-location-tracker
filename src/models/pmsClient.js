import { Model } from "sequelize";
import { TABLES } from "../utils/constants.js";

export default (sequelize, DataTypes) => {
  class pmsClient extends Model {
    static associate(models) {
      // define associations here if needed in future
    }
  }

  pmsClient.init(
    {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },

      company_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },

      contact_person: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },

      office_address: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      contact_number: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },

      client_email: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },

      client_gst: {
        type: DataTypes.STRING(50),
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

      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "pmsClient",
      tableName: TABLES.CLIENT_TABLE || "clients",
      timestamps: false,
      underscored: true,
    },
  );

  return pmsClient;
};
