import { Injectable } from '@angular/core';
import { DatabaseService } from 'src/app/common/Database/database.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private db: DatabaseService) { }


  validateLogin(UserName,Password){

    this.db.getDatabaseState().subscribe(rdy => {
        console.log(rdy);
        if(rdy){
          this.db.getUser(UserName,Password)
          .then(res=>{
            return res
          })
        }
    });
  }


  Register(UserName,Password,UserTypeId){
    this.db.getDatabaseState().subscribe(rdy => {
        console.log(rdy);
        if(rdy){
          this.db.addUser(UserName,Password,UserTypeId)
          .then(res=>{
            return res
          })
        }
    });

  }
}
