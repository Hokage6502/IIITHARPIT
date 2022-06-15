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
  // console.log(req.query);
  let {DatasetID, AuthorID, tstatus,userid} = req.query;
      // console.log('List all requests');
      if(tstatus)
      execSql('SELECT * FROM request where AuthorID ="' + AuthorID + '" AND status ="'+tstatus+'"').then(rslt => res.json(rslt));
      else
      execSql('SELECT * FROM request where AuthorID ="' + AuthorID + '"').then(rslt => res.json(rslt));
});

module.exports = router;