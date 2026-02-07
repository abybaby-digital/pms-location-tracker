import { Model } from "sequelize";
import { TABLES } from "../utils/constants.js";

export default (sequelize, DataTypes) => {
  class pmsFoEnquaries extends Model {}

  pmsFoEnquaries.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      project_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },

      team_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },

      fo_ids: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },

      fo_main_id: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },

      fo_junior_id: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },

      dealership_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },

      activity_location: {
        type: DataTypes.TEXT,
        allowNull: false,
      },

      latitude: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },

      longitude: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },

      customer_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },

      customer_number: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },

      test_drive: {
        type: DataTypes.ENUM("0", "1"),
        allowNull: false,
        comment: "0=no, 1=yes",
      },

      current_vehicle: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },

      current_vehicle_number: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },

      model_year_of_mfg: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },

      interested_vehicle: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },

      spot_booking: {
        type: DataTypes.ENUM("0", "1"),
        allowNull: false,
        defaultValue: "0",
      },

      retail: {
        type: DataTypes.ENUM("0", "1"),
        allowNull: false,
        defaultValue: "0",
      },

      gift_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },

      type_of_lead: {
        type: DataTypes.ENUM("Hot", "Warm", "Cold"),
        allowNull: false,
        defaultValue: "Cold",
      },

      remarks: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      status: {
        type: DataTypes.ENUM("0", "1", "2"),
        allowNull: false,
        defaultValue: "1",
        comment: "0=Inactive, 1=Active, 2=Deleted",
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
        defaultValue: DataTypes.NOW,
      },

      updated_by: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "pmsFoEnquaries",
      tableName: TABLES.FO_ENQUARIES || "fo_enquaries",
      timestamps: false,
    },
  );

//   pmsFoEnquaries.associate = (models) => {
//     pmsFoEnquaries.belongsTo(models.pmsProject, {
//       foreignKey: "project_id",
//       as: "project",
//     });

//     pmsFoEnquaries.belongsTo(models.pmsProjectTeam, {
//       foreignKey: "team_id",
//       as: "team",
//     });

//     pmsFoEnquaries.belongsTo(models.pmsUser, {
//       foreignKey: "fo_main_id",
//       as: "foMain",
//     });

//     pmsFoEnquaries.belongsTo(models.pmsUser, {
//       foreignKey: "fo_junior_id",
//       as: "foJunior",
//     });

//     //   pmsFoEnquaries.belongsTo(models.dealership, {
//     //     foreignKey: "dealership_id",
//     //     as: "dealership",
//     //   });
//   };

  return pmsFoEnquaries;
};
