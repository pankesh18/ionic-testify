CREATE TABLE IF NOT EXISTS User(UserId INTEGER PRIMARY KEY AUTOINCREMENT,Username TEXT,Password TEXT, UserTypeId INTEGER);
INSERT INTO User (Username,Password ,UserTypeId)VALUES( 'admin', 'admin' ,1);
