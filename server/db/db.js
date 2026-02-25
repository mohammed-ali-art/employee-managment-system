import mongoose from 'mongoose';

const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('Database connected successfully');
    } catch (error) {
        console.log(error)
    }
};
console.log(process.env.MONGODB_URL)
export default connectToDatabase;