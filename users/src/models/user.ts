import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";
import { database } from "../helpers/database";
import bcrypt from "bcrypt";

enum UserRole {
  admin = "admin",
  customer = "customer",
  modrator = "modrator",
}
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
      type: DataTypes.INTEGER,
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
      async set(value: string) {
        const hashed = await bcrypt.hash(value, process.env.SECRET_KEY!);
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
