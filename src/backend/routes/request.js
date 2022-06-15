const db = require('../db');
const express = require('express');
const sql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');


const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json())

function execSql(statement, values) {
    let p = new Promise(function (res, rej) {
      db.con.query(statement, values, function (err, result) {
        if (err) rej(err);
        else res(result);
      });
    });
    return p;
  }

router.post("/", async (req, res) => {
  console.log(req.body);
  let databaseId = parseInt(req.body.id);
  let database = req.body.data[databaseId-1];
  let userid = parseInt(req.body.userid);
  console.log('database: ', database);
  let Authorid = database.AuthorID;
  // let databaseId = parseInt(database.DatasetID);
  let databaseName = database.Name;

  // console.log(`INSERT INTO database_access_request (database_name, database_id, request_from, status) VALUES (${databaseName}, ${databaseId}, ${userid}, 0)`)
  execSql(`INSERT INTO request ( database_name, database_id, AuthorID, request_from, status) VALUES ( '${databaseName}', ${databaseId}, ${Authorid}, ${userid},'PENDING' )`).then(() => res.status(200));

});

module.exports = router;