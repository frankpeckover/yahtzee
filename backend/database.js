const sql = require('mssql');

// SQL Server configuration
const config = {
    user: 'sa', 
    password: 'M0nk3ym@n6797',  //This needs to go
    server: '192.168.1.110', 
    database: 'yahtzee_db', 
    options: {
        encrypt: true,              
        trustServerCertificate: true
    }
};

// Create a connection pool
const sqlConnect = async () => {
    const sqlDb = await new sql.ConnectionPool(config).connect();
    return sqlDb;
};

const getUser = async (username) => {
    const connection = await sqlConnect();
    const result = await connection.request()
        .input('username', username)
        .query(`SELECT * FROM users WHERE username = @username`);

    //console.log(`Result (getUser): ${JSON.stringify(result.recordset)}`)
    return result.recordset;
}

const addUser = async (username, hashedPassword) => {
    const connection = await sqlConnect();
    const result = await connection.request()
        .input('username', username)
        .input('password', hashedPassword)
        .input('dateCreated', new Date().toISOString())
        .query(`
            INSERT INTO users (
                username, password, dateCreated
            ) OUTPUT INSERTED.userID VALUES (
                @username, @password, @dateCreated
            ) 
        `);

    //console.log(`Result (addUser): ${JSON.stringify(result.recordset)}`)
    return result
}

const getGame = async (gameID) => {
    const connection = await sqlConnect();
    const result = await connection.request()
        .input('gameID', gameID)
        .query(`SELECT * FROM games WHERE gameID = @gameID`);

    //console.log(`Result (getGame): ${JSON.stringify(result.recordset)}`)
    return result.recordset;
}

const addGame = async (numPlayers, status) => {
    const connection = await sqlConnect();
    const result = await connection.request()
        .input('numPlayers', numPlayers)
        .input('status', status)
        .input('dateCreated', new Date().toISOString())
        .query(`
            INSERT INTO games (
                numPlayers, status, dateCreated
            ) OUTPUT INSERTED.gameID VALUES (
                @numPlayers, @status, @dateCreated
            ) 
        `);

    //console.log(`Result (addGame): ${JSON.stringify(result.recordset[0])}`)
    return result.recordset
}

const addScore = async (gameID, data) => {
    const connection = await sqlConnect();
    const result = await connection.request()
        .input('gameID', gameID)
        .input('userID', data.isGuest ? 1 : data.userID )
        .input('playerName', data.playerName)
        .input('ones', data.ones)
        .input('twos', data.twos)
        .input('threes', data.threes)
        .input('fours', data.fours)
        .input('fives', data.fives)
        .input('sixes', data.sixes)
        .input('threeKind', data.threeKind)
        .input('fourKind', data.fourKind)
        .input('fullHouse', data.fullHouse)
        .input('shortStraight', data.shortStraight)
        .input('longStraight', data.longStraight)
        .input('chance', data.chance)
        .input('yahtzee', data.yahtzee)
        .input('yahtzeeBonus', data.yahtzeeBonus)
        .input('bonus', data.bonus)
        .input('topSubTotal', data.topSubTotal)
        .input('topTotal', data.topTotal)
        .input('bottomTotal', data.bottomTotal)
        .input('grandTotal', data.grandTotal)
        .query(`
            INSERT INTO scores (
                gameID, userID, playerName, ones, twos, threes, fours, fives, sixes, 
                threeKind, fourKind, fullHouse, shortStraight, 
                longStraight, chance, yahtzee, yahtzeeBonus, bonus, 
                topSubTotal, topTotal, bottomTotal, grandTotal
            ) OUTPUT INSERTED.scoreID VALUES (
                @gameID, @userID, @playerName, @ones, @twos, @threes, @fours, @fives, @sixes, 
                @threeKind, @fourKind, @fullHouse, @shortStraight, 
                @longStraight, @chance, @yahtzee, @yahtzeeBonus, @bonus, 
                @topSubTotal, @topTotal, @bottomTotal, @grandTotal
            )
        `);

    //console.log(`Result (addScore): ${JSON.stringify(result.recordset)}`)
    return result
}

const getScores = async () => {
    const connection = await sqlConnect();
	const result = await connection.query(`select * from scores`)

    //console.log(`Result (getScores): ${JSON.stringify(result.recordset)}`)
    return result.recordset
}

module.exports = {
    sql,
    getUser,
    addUser,
    getScores,
    addScore,
    getGame,
    addGame
};
