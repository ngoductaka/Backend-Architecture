
const dev = {
    app:{
        port: process.env.PORT || 3000
    },
    db: {
        uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/devdb'
    }
}
const prod = {
    app:{
        port: process.env.PORT || 3000
    },
    db: {
        uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/devdb'
    }
}

const config = {dev, prod}

module.exports = config[process.env.NODE_ENV || 'dev'];