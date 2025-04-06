import mongoose from "mongoose";

export async function connectDB(): Promise<void> {
  const mongoUri =
    process.env.MONGO_URI || "mongodb://localhost:27017/Node-CI-CD";
  await mongoose.connect(mongoUri);
  console.log("MongoDB connected");
}
