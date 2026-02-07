import { Model } from "sequelize";
import { TABLES } from "../utils/constants.js";

export default (sequelize, DataTypes) => {
  class pmsProjectTeam extends Model {}

  pmsProjectTeam.init(
    {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      project_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      project_number: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },

      financial_year: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },

      team_name: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },

      fo_ids: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },

      fo_main_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },

      fo_junior_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },

      status: {
        type: DataTypes.ENUM("0", "1", "2"),
        defaultValue: "1",
        allowNull: false,
        comment: "0=Inactive, 1=Active, 2=Deleted",
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
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },

      updated_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "pmsProjectTeam",
      tableName: TABLES.PROJECT_TEAM || "project_team",
      timestamps: false, // DB handles timestamps
    },
  );

  // pmsProjectTeam.associate = (models) => {
  //   // pmsProjectTeam.belongsTo(models.project, {
  //   //   foreignKey: "project_id",
  //   //   as: "project",
  //   // });

  //   // pmsProjectTeam.belongsTo(models.user, {
  //   //   foreignKey: "fo_main_id",
  //   //   as: "foMain",
  //   // });

  //   // pmsProjectTeam.belongsTo(models.user, {
  //   //   foreignKey: "fo_junior_id",
  //   //   as: "foJunior",
  //   // });
  // };

  return pmsProjectTeam;
};
