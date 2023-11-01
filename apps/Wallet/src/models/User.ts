import mongoose from "mongoose";
import { ROLES } from "@/types";

export interface User extends mongoose.Document {
  name: string;
  publicKey: string;
  emailAddress: string;
  role: string;
  safeAddress: string;
}

const UserSchema = new mongoose.Schema<User>({
  name: {
    type: String,
    required: [true, "Please provide a name for the user."],
  },
  publicKey: {
    type: String,
    required: [true, "Please specify the public key of your user."],
  },
  emailAddress: {
    type: String,
    required: [true, "Please specify the email address."],
  },
  role: {
    type: String,
    required: [true, "Please specify a role for the user."],
    enum: ROLES,
  },
  safeAddress: {
    type: String,
    required: [true, "Please specify the safe address."],
  },
});

export default mongoose.models.User || mongoose.model<User>("User", UserSchema);
