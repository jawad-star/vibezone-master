import mongoose from "mongoose";

let isConnected = false; // Track connection status

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("✅ MongoDB is already connected");
    return;
  }

  try {
    console.log("🔄 Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "Flicksy",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true;
    console.log("✅ MongoDB is connected");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
  }
};
