import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { SQLitePorter } from '@awesome-cordova-plugins/sqlite-porter/ngx';
// import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { HttpClient } from '@angular/common/http';
// import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { User } from 'src/app/Pages/login/login.models';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private dbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private db: SQLiteObject;

  constructor(private platform: Platform, private sqlitePorter: SQLitePorter, private sqlite: SQLite, private http: HttpClient) {

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
    this.http.get('../../../assets/database/db.sql', { responseType: 'text'})
    .subscribe(sql => {
      this.sqlitePorter.importSqlToDb(this.db, sql)
        .then(_ => {
          this.testSQL();
          this.dbReady.next(true);
        })
        .catch(e => console.error(e));
    });
  }

 ;

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
    return from(this.db.executeSql('INSERT INTO User (Username, Password, UserTypeId) VALUES (?, ?, ?)', data))
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
    return from(this.db.executeSql('INSERT INTO Test (TestName, CourseId,CreatedBy) VALUES (?, ?, ?)', data).then(row=>{  return row.insertId }));
  }


  addTopic(TopicName) {
    let data = [TopicName];
    return from(this.db.executeSql('INSERT INTO Topic (TopicName) VALUES (?)', data).then(row=>{  return row.insertId }));
  }


  addQuestion(QuestionBody,	QuestionTypeId,	TopicId	,TestId) {
    let data = [QuestionBody,	QuestionTypeId,	TopicId	,TestId];
    return from(this.db.executeSql('INSERT INTO Question (QuestionBody,	QuestionTypeId,	TopicId	,TestId) VALUES (?, ?, ?, ?)', data).then(row=>{  return row.insertId }))
  }

  addOption(OptionBody,	IsCorrect	,QuestionId) {
    let data = [OptionBody,	IsCorrect	,QuestionId];
    return from(this.db.executeSql('INSERT INTO AnswerOption (OptionBody,	IsCorrect	,QuestionId) VALUES (?, ?, ?)', data).then(row=>{  return row.insertId }))
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



}
