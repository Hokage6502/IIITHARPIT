const sql = require('mysql');

var con = sql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "dfs"
});

var usersTable = `
CREATE TABLE users(
    UserID int NOT NULL AUTO_INCREMENT,
    Name MEDIUMTEXT NOT NULL,
    PRIMARY KEY (UserID)
);
`
con.query(usersTable, (err, res) => {
    if (err) throw err;
    console.log("Users Table created!");
});

var datasetsTable = `
CREATE TABLE datasets(
    DatasetID int NOT NULL AUTO_INCREMENT,
    Name TEXT(1500) NOT NULL,
    Description LONGTEXT NOT NULL,
    AuthorID int NOT NULL,
    Public BOOL NOT NULL,
    TnC LONGTEXT,
    Source MEDIUMTEXT,
    PRIMARY KEY(DatasetID),
    FOREIGN KEY(AuthorID) REFERENCES users(UserID)
);
`
con.query(datasetsTable, (err, res) => {
    if (err) throw err;
    console.log("Datasets Table created!");
});

var versionsTable = `
CREATE TABLE versions(
    DatasetID int NOT NULL,
    Version varchar(50) NOT NULL,
    Changes JSON,
    Status ENUM("PENDING","APPROVED","REJECTED") DEFAULT "PENDING",
    Published Datetime,
    PRIMARY KEY(DatasetID, Version),
    FOREIGN KEY(DatasetID) REFERENCES datasets(DatasetID)
);
`

con.query(versionsTable, (err, res) => {
    if (err) throw err;
    console.log("Versions Table created!");
});

var filesTable = `
CREATE TABLE files(
    DatasetID int NOT NULL,
    Version varchar(50) NOT NULL,
    Filename varchar(256) NOT NULL,
    PRIMARY KEY (DatasetID, Version, Filename),
    FOREIGN KEY (DatasetID, Version) REFERENCES versions(DatasetID, Version)
);
`
con.query(filesTable, (err, res) => {
    if (err) throw err;
    console.log("Files Table created!");
});

var commentsTable = `
CREATE TABLE comments(
    DatasetID int NOT NULL,
    CommentID int NOT NULL AUTO_INCREMENT,
    Comment LONGTEXT NOT NULL,
    AuthorID int NOT NULL,
    ReplyID int,
    PRIMARY KEY (CommentID),
    FOREIGN KEY (DatasetID) REFERENCES datasets(DatasetID),
    FOREIGN KEY (ReplyID) REFERENCES comments(CommentID),
    FOREIGN KEY (AuthorID) REFERENCES users(UserID)
);`

con.query(commentsTable, (err, res) => {
    if (err) throw err;
    console.log("Comments Table Created!");
});