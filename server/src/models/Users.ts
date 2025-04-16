import mongoose, { Document, Model, Schema } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
  name: string;
  picture: string;
  email: string;
  password: string;
  settings: {
    password: {
      resetPasswordToken?: string;
      resetPasswordExpires?: Date;
    };
  };
  comparePassword(enteredPassword: string): Promise<boolean>;
}

export type UserType = {
  name?: string;
  picture?: string;
  email: string;
};

const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
    unique: false,
    lowercase: true,
  },
  picture: {
    type: String,
    required: false,
    unique: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  settings: {
    password: {
      resetPasswordToken: { type: String, required: false },
      resetPasswordExpires: { type: Date, required: false },
    },
  },
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  // Ensure the password is not already hashed
  if (!this.password.startsWith("$2a$")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }

  next();
});
UserSchema.methods.comparePassword = async function (
  enteredPassword: string
): Promise<boolean> {
  return bcrypt.compare(enteredPassword, this.password);
};

export const User: Model<IUser> = mongoose.model<IUser>("User", UserSchema);
