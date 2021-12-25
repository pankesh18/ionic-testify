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

}
