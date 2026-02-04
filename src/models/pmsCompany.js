import { Model } from "sequelize";
import { TABLES } from "../utils/constants.js";

export default (sequelize, DataTypes) => {
  class pmsCompany extends Model {
    static associate(models) {
      // One Company has many Users
      this.hasMany(models.pmsUser, {
        foreignKey: "company_id",
        sourceKey: "id",
        as: "users",
      });
    }
  }

  pmsCompany.init(
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      company_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },

      company_details: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      company_gst: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },

      company_address: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      contact_person: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },

      contact_number: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },

      contact_email: {
        type: DataTypes.STRING(255),
        allowNull: true,
        validate: {
          isEmail: true,
        },
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
      modelName: "pmsCompany",
      tableName: TABLES.COMPANY_TABLE || "companies",
      timestamps: false,
    },
  );

  return pmsCompany;
};
