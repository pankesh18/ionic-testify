CREATE TABLE IF NOT EXISTS User(UserId INTEGER PRIMARY KEY AUTOINCREMENT,Username TEXT,Password TEXT, UserTypeId INTEGER);
INSERT INTO User (Username,Password ,UserTypeId)VALUES( 'admin', 'admin' ,1);
INSERT INTO User (Username,Password ,UserTypeId)VALUES( 'student', 'student' ,1);


CREATE TABLE IF NOT EXISTS Course(CourseId INTEGER PRIMARY KEY AUTOINCREMENT,CourseName TEXT);
INSERT INTO Course (CourseName)VALUES( 'Physics');
INSERT INTO Course (CourseName)VALUES( 'Chemistry');
INSERT INTO Course (CourseName)VALUES( 'Maths');
INSERT INTO Course (CourseName)VALUES( 'Literature');


CREATE TABLE IF NOT EXISTS Test(TestId INTEGER PRIMARY KEY AUTOINCREMENT,TestName TEXT,CourseId INTEGER, CreatedBy INTEGER);
INSERT INTO Test (TestName,CourseId ,CreatedBy)VALUES( 'Default-Test', 3 ,1);

CREATE TABLE IF NOT EXISTS UserTestMap(UserTestMapId INTEGER PRIMARY KEY AUTOINCREMENT,TestId INTEGER,UserId INTEGER);
INSERT INTO UserTestMap (TestId,UserId)VALUES(1 ,2);

CREATE TABLE IF NOT EXISTS Topic(TopicId INTEGER PRIMARY KEY AUTOINCREMENT,TopicName TEXT);
INSERT INTO Topic (TopicName)VALUES( 'General Topic');


CREATE TABLE IF NOT EXISTS QuestionType(QuestionTypeId INTEGER PRIMARY KEY AUTOINCREMENT,QuestionTypeDescription TEXT,IsAutoGrading INTEGER);
INSERT INTO QuestionType (QuestionTypeDescription,IsAutoGrading)VALUES('MCQ',1);
INSERT INTO QuestionType (QuestionTypeDescription,IsAutoGrading)VALUES('Descriptive Answer',0);



CREATE TABLE IF NOT EXISTS Question(QuestionId INTEGER PRIMARY KEY AUTOINCREMENT,QuestionBody TEXT,QuestionTypeId INTEGER, TopicId INTEGER,TestId INTEGER);
INSERT INTO Question (QuestionBody,QuestionTypeId,TopicId,TestId)VALUES('<p>Testing MCQ Question?</p>', 1, 1,1);
INSERT INTO Question (QuestionBody,QuestionTypeId,TopicId,TestId)VALUES('<p>Testing Descriptive Question?</p>', 2, 1,1);

CREATE TABLE IF NOT EXISTS AnswerOption(AnswerOptionId INTEGER PRIMARY KEY AUTOINCREMENT,OptionBody TEXT,IsCorrect INTEGER,QuestionId INTEGER);
INSERT INTO AnswerOption (OptionBody,IsCorrect,QuestionId)VALUES('<p>Yes</p>', 1, 1);
INSERT INTO AnswerOption (OptionBody,IsCorrect,QuestionId)VALUES('<p>No</p>', 0, 1);

CREATE TABLE IF NOT EXISTS UserAnswer(UserAnswerId INTEGER PRIMARY KEY AUTOINCREMENT,AnswerBody TEXT,QuestionId INTEGER, OptionSelected INTEGER, AnswerAttachment1 BLOB,	AnswerAttachment2 BLOB,	AnswerAttachment3 BLOB);






