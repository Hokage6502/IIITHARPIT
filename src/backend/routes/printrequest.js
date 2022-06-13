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

router.get("/", async (req, res) => {
  console.log(req.query);
      console.log('List all requests');
      execSql('SELECT * FROM request ').then(rslt => res.json(rslt));
});

module.exports = router;