const sql = require('mssql');

// SQL Server configuration
const config = {
    user: 'sa',          // SQL Server username
    password: 'M0nk3ym@n6797',      // SQL Server password
    server: '192.168.1.110',  // Server address or 'localhost'
    database: 'yahtzee_db', // Database name
    options: {
        encrypt: true,              // Use encryption (optional, depending on your setup)
        trustServerCertificate: true // Trust the server certificate (useful for self-signed certs)
    }
};

// Create a connection pool
const poolPromise = sql.connect(config)
    .then(pool => {
        console.log('Connected to MSSQL');
        return pool;
    })
    .catch(err => {
        console.error('Database connection failed: ', err);
        process.exit(1);
    });

module.exports = {
    sql,
    poolPromise
};
