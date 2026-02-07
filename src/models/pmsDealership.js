import { Model } from "sequelize";
import { TABLES } from "../utils/constants.js";

export default (sequelize, DataTypes) => {
  class pmsDealership extends Model {
    static associate(models) {
      this.belongsTo(models.pmsUser, {
        foreignKey: "created_by",
        as: "user_data",
      });

      // updated_by user
      this.belongsTo(models.pmsUser, {
        foreignKey: "updated_by",
        as: "user_data_update",
      });
    }
  }

  pmsDealership.init(
    {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },

      dealer_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },

      status: {
        type: DataTypes.ENUM("0", "1", "2"),
        allowNull: false,
        defaultValue: "1",
      },

      created_at: {
        type: DataTypes.DATE,
        allowNull: true,
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
      modelName: "pmsDealership",
      tableName: TABLES.DEALERSHIP_TABLE || "dealerships",
      timestamps: false,
      underscored: true,
    },
  );

  return pmsDealership;
};
