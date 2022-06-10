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

router.post('/upload', (req, res) => {

    console.log(req.body);

    var {Name, Description, AuthorID, Public, Tnc, Source, filenames} = req.body;
    var datasetId = 0;

    const query1 = "INSERT INTO datasets (Name, Description, AuthorID, Public, Tnc, Source) VALUES (?, ?, ?, ?, ?, ?)"
    const query2 = "INSERT INTO versions (DatasetID, Version, Changes, Status, Published) VALUES (?, '1.0.0', '[\"Initial version\"]', 'PENDING', '" + new Date().toISOString().slice(0, 19).replace('T', ' ') + "')";
    execSql(query1, [Name, Description, AuthorID, Public, Tnc, Source]).then(result => {
        datasetId  = result.insertId;
        execSql(query2, [datasetId.toString()]).then(() => {
            for (file of filenames) {
                execSql("INSERT INTO files (DatasetID, Version, Filename) VALUES (?, ?, ?)", [datasetId.toString(), '1.0.0', file]);
            }
        });
        res.json({"DatasetID": datasetId}).status(200);
    });
});

router.post('/upload/:id', (req, res) => {

    console.log(req.body);

    var DatasetID = req.params.id;
    var {Version, Changes, filenames} = req.body; 

    const query = "INSERT INTO versions (DatasetID, Version, Changes, Status, Published) VALUES (?, ?, ?, 'PENDING', '" + new Date().toISOString().slice(0, 19).replace('T', ' ') + "')";
    execSql(query, [DatasetID, Version, Changes]).then(() => {
        for (file of filenames) {
            execSql("INSERT INTO files (DatasetID, Version, Filename) VALUES (?, ?, ?)", [DatasetID, Version, file]);
        }
        res.status(200);
    })

});

router.post("/edit/:DatasetID", (req, res) => {

    console.log(req.body)
    console.log(req.params)
    const query = 'UPDATE `datasets` SET ? WHERE ?';
    execSql(query, [req.body, req.params]).then(reslt => res.json(reslt));
});

router.post("/version", (req, res) => {

    console.log(req.body)
    console.log(req.query)
    var {Changes, filenames} = req.body
    if (Changes && filenames) {
        execSql('UPDATE `versions` SET ? WHERE DatasetID = ? AND Version = ?', [{"Changes" : Changes}, req.query.DatasetID, req.query.Version])
        .then(() => {
            for(file of filenames) {
                execSql("INSERT INTO files (DatasetID, Version, Filename) VALUES (?, ?, ?)", [req.query.DatasetID, req.query.Version, file]);
            }
            res.status(200);
        });
    }
    else if (Changes) {
        execSql('UPDATE `versions` SET ? WHERE DatasetID = ? AND Version = ?', [{"Changes" : Changes}, req.query.DatasetID, req.query.Version])
        .then(() => res.status(200));
    }
    else {
        for(file of filenames) {
            execSql("INSERT INTO files (DatasetID, Version, Filename) VALUES (?, ?, ?)", [req.query.DatasetID, req.query.Version, file]);
        }
        res.status(200);
    }

});

router.get('/', (req, res) => {

    console.log(req.query);
    let {DatasetID, AuthorID, Status} = req.query;

    if(DatasetID){
        var resp = {}
        console.log("Get dataset details")
        execSql('SELECT * FROM datasets WHERE DatasetID = "' + DatasetID + '"').then(rslt => {
            resp['dataset'] = rslt[0];
            execSql('SELECT * FROM versions WHERE DatasetID = "' + DatasetID + '"')
            .then(
                // execSql('SELECT * FROM files WHERE AuthorID = "' + AuthorID + '"') 
                async rslt2 => {
                let versions = rslt2
                for (v of versions) {
                    v['files'] = []
                    await execSql('SELECT filename as file FROM files WHERE DatasetID = "' + DatasetID + '" AND Version = "' + v["Version"] + '"').then(rslt3 => {
                        for (file of rslt3) {
                            // console.log(file)
                            v['files'].push(file['file'])
                        }
                    });
                }
                resp['versions'] = versions;
                res.json(resp);
            })
        });
    }
    else if (AuthorID && Status){
        console.log("List all datasets of User AuthorID and Status");
        execSql('SELECT * FROM datasets JOIN versions ON datasets.DatasetID = versions.DatasetID WHERE versions.Status = "' + Status + '" AND datasets.AuthorID = "' + AuthorID + '"').then(rslt => res.json(rslt));
    }
    else if (AuthorID){
        console.log("List all datasets of User userID");
        execSql('SELECT * FROM datasets JOIN versions ON datasets.DatasetID = versions.DatasetID WHERE datasets.AuthorID = "' + AuthorID + '"').then(rslt => res.json(rslt));
    }
    else if (Status){
        console.log("List all datasets with Status");
        execSql('SELECT * FROM datasets JOIN versions ON datasets.DatasetID = versions.DatasetID WHERE versions.Status = "' + Status + '"').then(rslt => res.json(rslt));
    }
    else {
        console.log('List all datasets');
        execSql('SELECT * FROM datasets').then(rslt => res.json(rslt))
    }
});

module.exports = router;