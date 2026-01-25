const mongoose = require('mongoose');
const initDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/mydatabase', {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
        });
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Database connection error:', error);
    }
};

class Database {
    constructor() {
        console.log('Initializing database instance');
        this.connect();
    }

    async connect() {
        try {
            const MONGODB_URL = "mongodb://root:jfhe434jc349fj@34.124.179.173:28029/iwms?authSource=admin&retryWrites=true"
            await mongoose.connect(MONGODB_URL, {
                // useNewUrlParser: true,
                // useUnifiedTopology: true,
            });
            console.log('Database connected successfully', mongoose.connection.name, mongoose.connections.length);

        } catch (error) {
            console.error('Database connection error:', error);
        }
    }

    static getInstance() {
        console.log('Getting database instance');
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }
}

const instance = Database.getInstance();

module.exports = { initDB, instance };