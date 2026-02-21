import mongoose from "mongoose";

export interface IUser extends mongoose.Document {
  name: string;
  email: string;
  password?: string;
  role: "buyer" | "seller" | "admin";
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
      maxlength: [60, "Name cannot be more than 60 characters"],
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
      maxlength: [100, "Email cannot be more than 100 characters"],
    },
    password: {
      type: String,
      select: false, // Don't return password by default
      required: [false, "Please provide a password"], // Optional for OAuth
    },
    role: {
      type: String,
      enum: ["buyer", "seller", "admin"],
      default: "buyer",
    },
  },
  { timestamps: true },
);

export default mongoose.models.User ||
  mongoose.model<IUser>("User", UserSchema);
