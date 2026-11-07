const pool = require("./config/database");

async function testConnection() {

    try {

        const result = await pool.query(
            "SELECT * FROM books"
        );

        console.log(result.rows);

    } catch (error) {

        console.error(error);

    }

}

testConnection();