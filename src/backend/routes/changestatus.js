// const express = require('express');
// const router = express.Router();
// const { con, execSql } = require('../db');

// function isEmpty(obj) {
//   return Object.keys(obj).length === 0;
// }
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

router.post('/', (req, res) => {
    console.log("Response: ", req.body);
    let status = req.body.status;
    let reqid = parseInt(req.body.reqid);
    execSql('UPDATE request SET Status="'+status+'" WHERE ReqID='+reqid+'').then(() => res.status(200));
    res.json({"Status":"Changes Made"});
})

module.exports = router