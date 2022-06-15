const sql = require('mysql2');

var con = sql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234"
});

con.connect(err => {
    if(err) throw err;
    console.log("Connected");
    const q = "USE dfs"
    con.query(q, (err, res) => {
        console.log(err)
        console.log(res)
    });
})

module.exports = {
    con
}