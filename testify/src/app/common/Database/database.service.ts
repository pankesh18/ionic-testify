import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { SQLitePorter } from '@awesome-cordova-plugins/sqlite-porter/ngx';
// import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { HttpClient } from '@angular/common/http';
// import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { User } from 'src/app/Pages/login/login.models';
import { StorageService } from '../Storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private dbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private db: SQLiteObject;
  private isSeeded:boolean=false;
  constructor(private platform: Platform, private sqlitePorter: SQLitePorter, private sqlite: SQLite, private http: HttpClient, private storageService:StorageService) {

    this.storageService.getItem("isSeeded").then(value=>{
      this.isSeeded=value;
    })
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'testify.db',
        location: 'default'
      })
      .then((db: SQLiteObject) => {
          this.db = db;

          this.seedDatabase();

      });
    });

  }


  seedDatabase() {



      console.log("seeding!!!!!!!")
      this.http.get('../../../assets/database/db.sql', { responseType: 'text'})
      .subscribe(sql => {
        this.sqlitePorter.importSqlToDb(this.db, sql)
          .then(_ => {

            if(this.isSeeded!==true){
              this.executeInsert();
            }



            this.dbReady.next(true);
          })
          .catch(e => console.error(e));
      });

  }


executeInsert(){

  this.addUser("admin","admin",1)
  this.addUser("student","student",2)

  this.addCourse("Physics")
  this.addCourse("Chemistry")
  this.addCourse("Maths")
  this.addCourse("Literature")


  this.addTest('Default-Test', 3 ,1)

  this.addTopic('General Topic')

  let data = [1];
  this.db.executeSql('INSERT OR IGNORE INTO QuestionType (QuestionTypeDescription,IsAutoGrading)VALUES (?, ?)', data)

  this.addQuestion('<p>Testing MCQ Question 1?</p>', 1, 1,1,[])
  this.addQuestion('<p>Testing MCQ Question 2?</p>', 1, 1,1,[])
  this.addQuestion('<p>Testing MCQ Question 3?</p>', 1, 1,1,[])


  this.addOption('<p>Yes</p>', 1, 1);
  this.addOption('<p>No</p>', 0, 1);

  this.addOption('<p>Yes</p>', 0, 2);
  this.addOption('<p>No</p>', 1, 2);

  this.addOption('<p>Yes</p>', 1, 3);
  this.addOption('<p>No</p>', 0, 3);


}




testSQL() {
    return this.db.executeSql('SELECT DATETIME("now")', []).then(data => {
      console.log(data)
    });
  }


  getDatabaseState() {
    return this.dbReady.asObservable();
  }



  addUser(username, password,UserTypeId) {
    let data = [username, password,UserTypeId];
    return from(this.db.executeSql('INSERT OR IGNORE INTO User (Username, Password, UserTypeId) VALUES (?, ?, ?)', data))
  }

  addCourse(Coursename) {
    let data = [Coursename];
    return from(this.db.executeSql('INSERT OR IGNORE INTO Course (CourseName)VALUES( ? )', data))
  }

  getUser(Username,Password){
    return this.db.executeSql('SELECT * FROM User WHERE Username= ? and Password=?', [Username,Password]).then(data => {

      if(data.rows.length>0){
        return {
          UserId: data.rows.item(0).UserId,
          Username: data.rows.item(0).Username,
          Password: data.rows.item(0).Password,
          UserTypeId:data.rows.item(0).UserTypeId
        }
      }
      else{
        return null;
      }


    });
  }


  getCourseList(){
    return this.db.executeSql('SELECT * FROM Course',[]).then(data => {
       let dataList=[]
      if(data.rows.length>0){

        for(let i=0; i<data.rows.length;i++){
          dataList.push({
            CourseId: data.rows.item(i).CourseId,
            CourseName: data.rows.item(i).CourseName
          })
        }
        return dataList;
      }
      else{
        return null;
      }


    });
  }









  getQuestionType(){
    return this.db.executeSql('SELECT * FROM QuestionType',[]).then(data => {
       let dataList=[]
      if(data.rows.length>0){

        for(let i=0; i<data.rows.length;i++){
          dataList.push({
            QuestionTypeId: data.rows.item(i).QuestionTypeId,
            QuestionTypeDescription: data.rows.item(i).QuestionTypeDescription,
            IsAutoGrading: data.rows.item(i).IsAutoGrading
          })
        }
        return dataList;
      }
      else{
        return null;
      }


    });
  }

  getTopicsList(){
    return this.db.executeSql('SELECT * FROM Topic',[]).then(data => {
       let dataList=[]
      if(data.rows.length>0){

        for(let i=0; i<data.rows.length;i++){
          dataList.push({
            TopicId: data.rows.item(i).TopicId,
            TopicName: data.rows.item(i).TopicName
          })
        }
        return dataList;
      }
      else{
        return null;
      }


    });
  }


  addTest(TestName,	CourseId,	CreatedBy) {
    let data = [TestName, CourseId,CreatedBy];
    return from(this.db.executeSql('INSERT OR IGNORE  INTO Test (TestName, CourseId,CreatedBy) VALUES (?, ?, ?)', data).then(row=>{  return row.insertId }));
  }


  addTopic(TopicName) {
    let data = [TopicName];
    return from(this.db.executeSql('INSERT  OR IGNORE  INTO Topic (TopicName) VALUES (?)', data).then(row=>{  return row.insertId }));
  }


  addQuestion(QuestionBody,	QuestionTypeId,	TopicId	,TestId, QuestionAttachments) {
    let data = [QuestionBody,	QuestionTypeId,	TopicId	,TestId, QuestionAttachments];
    return from(this.db.executeSql('INSERT  OR IGNORE  INTO Question (QuestionBody,	QuestionTypeId,	TopicId	,TestId,QuestionAttachments) VALUES (?, ?, ?, ?,?)', data).then(row=>{  return row.insertId }))
  }

  addOption(OptionBody,	IsCorrect	,QuestionId) {
    let data = [OptionBody,	IsCorrect	,QuestionId];
    return from(this.db.executeSql('INSERT  OR IGNORE  INTO AnswerOption (OptionBody,	IsCorrect	,QuestionId) VALUES (?, ?, ?)', data).then(row=>{  return row.insertId }))
  }


  getTestList(CreatedBy){
    return this.db.executeSql('SELECT Test.TestId,	Test.TestName,	Test.CourseId, Course.CourseName,	User.Username FROM Test INNER JOIN User on Test.CreatedBy = User.UserId INNER JOIN Course on Test.CourseId = Course.CourseId WHERE Test.CreatedBy = ?;',[CreatedBy]).then(data => {
       let dataList=[]
      if(data.rows.length>0){

        for(let i=0; i<data.rows.length;i++){
          dataList.push({
            TestId: data.rows.item(i).TestId,
            TestName: data.rows.item(i).TestName,
            CourseId : data.rows.item(i).CourseId,
            CourseName : data.rows.item(i).CourseName,
            Username : data.rows.item(i).Username
          })
        }
        return dataList;
      }
      else{
        return null;
      }


    });
  }


  getStudentTestList(){
    return this.db.executeSql('SELECT Test.TestId,	Test.TestName,	Test.CourseId, Course.CourseName,	User.Username FROM Test INNER JOIN User on Test.CreatedBy = User.UserId INNER JOIN Course on Test.CourseId = Course.CourseId ;',[]).then(data => {
       let dataList=[]
      if(data.rows.length>0){

        for(let i=0; i<data.rows.length;i++){
          dataList.push({
            TestId: data.rows.item(i).TestId,
            TestName: data.rows.item(i).TestName,
            CourseId : data.rows.item(i).CourseId,
            CourseName : data.rows.item(i).CourseName,
            Username : data.rows.item(i).Username
          })
        }
        return dataList;
      }
      else{
        return null;
      }


    });
  }



  getStudentResultList(UserId){
    let param=[UserId]
    return this.db.executeSql('SELECT distinct	Test.TestId,	Test.TestName,	Test.CourseId, Course.CourseName,	User.Username as CreatedBy FROM Test INNER JOIN Question ON Test.TestId=Question.TestId INNER JOIN	UserAnswer ON Question.QuestionId=UserAnswer.QuestionId INNER JOIN User on Test.CreatedBy = User.UserId INNER JOIN Course on Test.CourseId = Course.CourseId WHERE UserAnswer.UserId =?;',param).then(data => {
       let dataList=[]
      if(data.rows.length>0){

        for(let i=0; i<data.rows.length;i++){
          dataList.push({
            TestId: data.rows.item(i).TestId,
            TestName: data.rows.item(i).TestName,
            CourseId : data.rows.item(i).CourseId,
            CourseName : data.rows.item(i).CourseName,
            CreatedBy : data.rows.item(i).CreatedBy
          })
        }
        return dataList;
      }
      else{
        return null;
      }


    });
  }


  getResultList(UserId){
    let param=[UserId]
    return this.db.executeSql('SELECT distinct	Test.TestId,	Test.TestName,	Test.CourseId, Course.CourseName,	User.Username as SubmittedBy FROM Test INNER JOIN Question ON Test.TestId=Question.TestId INNER JOIN	UserAnswer ON Question.QuestionId=UserAnswer.QuestionId INNER JOIN User on UserAnswer.UserId = User.UserId INNER JOIN Course on Test.CourseId = Course.CourseId WHERE Test.CreatedBy =?;',param).then(data => {
       let dataList=[]
      if(data.rows.length>0){

        for(let i=0; i<data.rows.length;i++){
          dataList.push({
            TestId: data.rows.item(i).TestId,
            TestName: data.rows.item(i).TestName,
            CourseId : data.rows.item(i).CourseId,
            CourseName : data.rows.item(i).CourseName,
            SubmittedBy : data.rows.item(i).SubmittedBy
          })
        }
        return dataList;
      }
      else{
        return null;
      }


    });
  }



  getTestPadQuestions(TestId){
    // return


    return this.db.executeSql('SELECT * FROM Question WHERE TestId= ?',[TestId]).then(data => {
       let dataList=[]
        let rowdata=data;
      if(rowdata.rows.length>0) {

        for(let i=0; i<rowdata.rows.length;i++){



          dataList.push({
            QuestionId: rowdata.rows.item(i).QuestionId,
            QuestionBody: rowdata.rows.item(i).QuestionBody,
            QuestionTypeId : rowdata.rows.item(i).QuestionTypeId,
            TopicId : rowdata.rows.item(i).TopicId,
            TestId : rowdata.rows.item(i).TestId,
            QuestionAttachments:rowdata.rows.item(i).QuestionAttachments,
            OptionList: []
          })

        }
        return dataList;
      }
      else{
        return null;
      }


    })

  }



  getQuestionItem(QuestionId){
    let optionList=[]
    return this.db.executeSql('SELECT * FROM AnswerOption WHERE QuestionId = ?',[QuestionId]).then(data => {
      for(let j=0; j<data.rows.length;j++){
        optionList.push({
          AnswerOptionId :data.rows.item(j).AnswerOptionId,
          OptionBody :data.rows.item(j).OptionBody,
          IsCorrect :data.rows.item(j).IsCorrect,
          QuestionId :data.rows.item(j).QuestionId

        })


      }


    return optionList
    })
  }


  addAnswer(QuestionId,	OptionSelected	,IsCorrect,UserId) {
    let data = [QuestionId,	OptionSelected	,IsCorrect, UserId];
    return from(this.db.executeSql('INSERT  OR IGNORE  INTO UserAnswer (QuestionId,	OptionSelected	,IsCorrect,UserId) VALUES (?, ?, ?, ?)', data).then(row=>{  return row.insertId }))
  }


  getCorrectQuestion(TestId){
    return this.db.executeSql('SELECT User.UserId,	User.Username,	IsCorrect,	COUNT(*) as Count FROM	Question INNER JOIN	UserAnswer ON Question.QuestionId=UserAnswer.QuestionId INNER JOIN User ON UserAnswer.UserId=User.UserId WHERE TestId=? GROUP BY User.UserId,User.Username,IsCorrect;',[TestId]).then(data => {
       let dataList=[]
      if(data.rows.length>0){

        for(let i=0; i<data.rows.length;i++){
          dataList.push({
            UserId: data.rows.item(i).UserId,
            Username: data.rows.item(i).Username,
            IsCorrect : data.rows.item(i).IsCorrect,
            Count : data.rows.item(i).Count
          })
        }
        return dataList;
      }
      else{
        return null;
      }


    });
  }



  updatePassword(Password,UserId) {
    let data = [Password,	 UserId];
    return from(this.db.executeSql('UPDATE User SET Password = ? WHERE UserId = ?;', data).then(row=>{  return row.insertId }))
  }

}
