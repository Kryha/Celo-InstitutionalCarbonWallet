import mongoose from "mongoose";

export interface Safe extends mongoose.Document {
  name: string;
  owner: string;
  address: string;
  creation: number;
}

const SafeSchema = new mongoose.Schema<Safe>({
  name: {
    type: String,
    required: [true, "Please provide a name for the safe."],
  },
  owner: {
    type: String,
    required: [true, "Please provide the owner address of the safe."],
  },
  address: {
    type: String,
    required: [true, "Please specify the address of the safe."],
  },
  creation: {
    type: Number,
    required: [true, "Please specify the creation timestamp of your safe."],
  },
});

export default mongoose.models.Safe || mongoose.model<Safe>("Safe", SafeSchema);
