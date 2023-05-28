import mongoose from 'mongoose';


export const connectToDatabase = async (serverDatabaseConnUrl: string | undefined): Promise<mongoose.Connection> => {
    if (!serverDatabaseConnUrl) {
        throw new Error('The database connection url isn\'t specified on environment.');
    }

    await mongoose.connect(serverDatabaseConnUrl);
    return mongoose.connection;
};
