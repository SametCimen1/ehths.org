const Pool = require('pg').Pool;
const dotenv = require('dotenv');
dotenv.config();

// const pool = new Pool ({
//     user:process.env.DBUSERNAME,
//     password:process.env.DBPASSWORD,
//     host:"localhost",
//     port:5432,
//     database:"ehths"
// })

const proConfig = {
    connectionString:'postgresql://doadmin:AVNS_AUCa9LL9ckulwN8nq96@db-postgresql-nyc1-47053-do-user-9652811-0.b.db.ondigitalocean.com:25060/defaultdb',
    ssl: {
        rejectUnauthorized: false
    }
}

const pool = new Pool(proConfig)

module.exports = pool;