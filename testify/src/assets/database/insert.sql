INSERT OR IGNORE INTO User (Username,Password ,UserTypeId)VALUES( 'admin', 'admin' ,1);
INSERT OR IGNORE INTO User (Username,Password ,UserTypeId)VALUES( 'student', 'student' ,1);



INSERT OR IGNORE INTO Course (CourseName)VALUES( 'Physics');
INSERT OR IGNORE INTO Course (CourseName)VALUES( 'Chemistry');
INSERT OR IGNORE INTO Course (CourseName)VALUES( 'Maths');
INSERT OR IGNORE INTO Course (CourseName)VALUES( 'Literature');





INSERT OR IGNORE INTO Test (TestName,CourseId ,CreatedBy) VALUES ('Default-Test', 3 ,1)




INSERT OR IGNORE INTO UserTestMap (TestId,UserId)VALUES(1 ,2);


INSERT OR IGNORE INTO Topic (TopicName)VALUES( 'General Topic');


INSERT OR IGNORE  INTO QuestionType (QuestionTypeDescription,IsAutoGrading)VALUES('MCQ',1);
INSERT OR IGNORE INTO QuestionType (QuestionTypeDescription,IsAutoGrading)VALUES('Descriptive Answer',0);




INSERT OR IGNORE INTO Question (QuestionBody,QuestionTypeId,TopicId,TestId)VALUES('<p>Testing MCQ Question?</p>', 1, 1,1);
INSERT OR IGNORE INTO Question (QuestionBody,QuestionTypeId,TopicId,TestId)VALUES('<p>Testing Descriptive Question?</p>', 2, 1,1);



INSERT OR IGNORE INTO AnswerOption (OptionBody,IsCorrect,QuestionId)VALUES('<p>Yes</p>', 1, 1);
INSERT OR IGNORE INTO AnswerOption (OptionBody,IsCorrect,QuestionId)VALUES('<p>No</p>', 0, 1);


