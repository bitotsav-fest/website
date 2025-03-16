import mongoose from "mongoose";

const connection = {};

async function dbConnect() {
    if (connection.isConnected) {
        console.log("Already connected to DB");
        return;
    }
    try {
        const db = await mongoose.connect(process.env.MONGODB_URI1 || '', {});
        connection.isConnected = db.connections[0].readyState;
        console.log("DB connected successfully!");
    } catch (error) {
        console.log("DB connection failed!", error);
        process.exit(1);
    }
}

export default dbConnect;
