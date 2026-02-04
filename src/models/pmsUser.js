import { Model } from "sequelize";
import { TABLES } from "../utils/constants.js";

export default (sequelize, DataTypes) => {
  class user extends Model {}

  user.init(
    {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },

      name_prefix_id: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },

      vh_prefix: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },

      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },

      email: {
        type: DataTypes.STRING(191),
        allowNull: false,
        unique: true,
      },

      role_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },

      state_id: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      company_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },

      branch_id: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      contact_number: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },

      email_verified_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },

      access_token: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING(255), // Laravel bcrypt hash
        allowNull: false,
      },

      remember_token: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },

      profile_img: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      user_details: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      veto_power: {
        type: DataTypes.ENUM("0", "1"),
        defaultValue: "0",
        allowNull: false,
      },

      firebase_token: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      fo_payment_req_amount: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: true,
      },

      pancard_no: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },

      aadhaar_no: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },

      gst_no: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },

      bank_name: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },

      bank_account: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },

      ifsc_code: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },

      status: {
        type: DataTypes.ENUM("0", "1", "2"),
        defaultValue: "1",
        allowNull: false,
        comment: "0=pending, 1=active, 2=deleted",
      },

      created_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },

      created_by: {
        type: DataTypes.BIGINT,
        allowNull: true,
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
      modelName: "user",
      tableName: TABLES.USER_TABLE || "users",
      timestamps: false, // Laravel handles timestamps
    },
  );

  user.associate = (models) => {
    user.belongsTo(models.pmsState, {
      foreignKey: "state_id",
      targetKey: "id",
      as: "state",
    });
    user.belongsTo(models.pmsRolemanagment, {
      foreignKey: "role_id",
      targetKey: "id",
      as: "role",
    });
    user.belongsTo(models.pmsCompany, {
      foreignKey: "company_id",
      targetKey: "id",
      as: "company",
    });
    user.belongsTo(models.pmsBranch, {
      foreignKey: "branch_id",
      as: "branch",
    });
    user.hasMany(models.pmsUserCheckin, {
      foreignKey: "user_id",
      as: "checkins",
    });
  };

  return user;
};
