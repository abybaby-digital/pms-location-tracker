import { Model } from "sequelize";
import { TABLES } from "../utils/constants.js";

export default (sequelize, DataTypes) => {
  class pmsProjectTeams extends Model {
    static associate(models) {
      this.belongsTo(models.pmsProject, {
        as: "project",
        foreignKey: "project_id",
      });

      this.belongsTo(models.pmsFinancialYear, {
        as: "fyear",
        foreignKey: "financial_year",
      });

      this.belongsTo(models.pmsUser, {
        as: "userCreatedByData",
        foreignKey: "created_by",
      });

      this.belongsTo(models.pmsUser, {
        as: "userUpdatedByData",
        foreignKey: "updated_by",
      });
    }
  }

  pmsProjectTeams.init(
    {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
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
      modelName: "pmsProjectTeams",
      tableName: TABLES.PROJECT_TEAMS_TABLE || "project_teams",
      timestamps: false,
      underscored: true,
    },
  );
  return pmsProjectTeams;
};
