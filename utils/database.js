import mongoose from 'mongoose';

let isConnected = false;

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if (mongoose.connection.readyState === 1) {
        console.log('MongoDB is already connected');
        return;
    }

    const db = process.env.MONGODB_URI;

    try {
        await mongoose.connect(db, {
            dbName: "share_prompt",
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        isConnected = true;
        console.log('MongoDB connected');
    } catch (error) {
        isConnected = false;
        console.log("Connection Error: ", error);
    }

};
