const pool = require('./db');

async function testConnection () {
    try{
        const connection = await pool.getConnection();
        console.log('Database connection successful');
        connection.release();
        
    }
    catch(err){
        console.error('Connection failed', err.message);
    }
    finally{
        process.exit;
    }
}

testConnection();