import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";
import { database } from "../helpers/database";
import bcrypt from "bcrypt";
import {UserRole} from "@moeed/common/build/middlewares/types/user-role";


interface User
  extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  id: CreationOptional<number>;
  name: string;
  lastname: string;
  phone: number;
  country: number | null;
  city: number | null;
  address: string | null;
  email: string | null;
  role: CreationOptional<UserRole>;
  password: string | null;
}
const User = database.define<User>(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: UserRole.customer,
    },
    name: {
      type: DataTypes.STRING,
    },
    lastname: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
      set(value: string) {
        if (value === null) return;
        const hashed = bcrypt.hashSync(value, 10);
        this.setDataValue("password", hashed);
      },
    },
    country: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    city: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  { timestamps: true }
);

export default User;
