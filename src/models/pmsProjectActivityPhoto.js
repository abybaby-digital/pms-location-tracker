import { Model } from "sequelize";
import { TABLES } from "../utils/constants.js";

export default (sequelize, DataTypes) => {
  class pmsProjectActivityPhoto extends Model {
    static associate(models) {
      this.belongsTo(models.pmsProjectTeams, {
        foreignKey: "team_id",
        as: "project_team",
      });

      this.belongsTo(models.pmsProject, {
        foreignKey: "project_id",
        as: "project_data",
      });

      this.belongsTo(models.pmsUser, {
        foreignKey: "created_by",
        as: "user_data_created",
      });

      this.belongsTo(models.pmsUser, {
        foreignKey: "updated_by",
        as: "user_data_updated",
      });
    }
  }

  pmsProjectActivityPhoto.init(
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

      team_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      fo_ids: {
        type: DataTypes.STRING(255),
        allowNull: true,
        comment: "Comma separated FO IDs",
      },

      financial_year: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      project_number: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      activity_photo: {
        type: DataTypes.TEXT,
        allowNull: false,
      },

      activity_description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      status: {
        type: DataTypes.ENUM("0", "1", "2"),
        defaultValue: "1",
        comment: "0=inactive, 1=active, 2=deleted",
      },

      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },

      created_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },

      updated_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "pmsProjectActivityPhoto",
      tableName: TABLES.PROJECT_ACTIVITY_PHOTO_TABLE || "project_activity_photos",
      timestamps: false,
    },
  );

  return pmsProjectActivityPhoto;
};
