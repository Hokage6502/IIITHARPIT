const express = require('express');
const fs = require('fs');
const md5 = require('md5');
const bodyParser = require('body-parser');


const router = express.Router();

router.use(bodyParser.raw({type: 'application/octet-stream', limit:'100gb'}));


router.post('/uploadfile', (req, res) => {
    const {name,currentChunkIndex,totalChunks} = req.query;
    const firstChunk = parseInt(currentChunkIndex) === 0;
    const lastChunk = parseInt(currentChunkIndex) === parseInt(totalChunks) -1;
    const ext = name.split('.').pop();
    const data = req.body.toString().split(',')[1];
    const buffer = new Buffer(data, 'base64');
    const tmpFilename = 'tmp_' + md5(name + req.ip) + '.' + ext;
    if (firstChunk && fs.existsSync('./uploads/'+tmpFilename)) {
        fs.unlinkSync('./uploads/'+tmpFilename);
    }
    fs.appendFileSync('./uploads/'+tmpFilename, buffer);
    if (lastChunk) {
        const finalFilename = name;
        fs.renameSync('./uploads/'+tmpFilename, './uploads/'+finalFilename);
        res.json({finalFilename});
    } else {
        res.json('ok');
    }
});

module.exports = router;