let mysql = require('mysql');

var pool;
if (process.env.NODE_ENV === 'production') {

    pool = mysql.createPool({
        connectionLimit: 10,
        host: "127.0.0.1",
        user: "jinesh",
        password: "jinesh",
        database: "fireblock",
        debug: false,
        waitForConnections: true,
        queueLimit: 0
    });
} else {

    pool = mysql.createPool({
        connectionLimit: 10,
        host: "127.0.0.1",
        user: "jinesh",
        password: "jinesh",
        database: "fireblock",
        debug: false,
        waitForConnections: true,
        queueLimit: 0
    });
}
// Initialize pool
module.exports = {pool};

