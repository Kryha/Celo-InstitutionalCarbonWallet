import mongoose from "mongoose";

export interface User extends mongoose.Document {
  name: string;
  surname: string;
  publicKey: string;
  emailAddress: string;
  role: string;
}

const UserSchema = new mongoose.Schema<User>({
  name: {
    type: String,
    required: [true, "Please provide a name for the user."],
  },
  surname: {
    type: String,
    required: [true, "Please provide the surname for the user."],
  },
  publicKey: {
    type: String,
    required: [true, "Please specify the public key of your user."],
    unique: true,
  },
  emailAddress: {
    type: String,
    required: [true, "Please specify the email address"],
    unique: true,
  },
  role: {
    type: String,
    enum: ["REGISTERED", "TRADER", "ADMIN"],
  },
});

export default mongoose.models.User || mongoose.model<User>("User", UserSchema);
