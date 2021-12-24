import { Component, OnInit } from '@angular/core';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { DatabaseService } from 'src/app/common/Database/database.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  isLogin:boolean=true;
  UserName:string;
  Password:string;
  UserTypeId:number;
  constructor(private file: File,private db: DatabaseService) { }

  ngOnInit() {
  }

  validateLogin(){

    this.db.getDatabaseState().subscribe(rdy => {
        console.log(rdy);
        if(rdy){
          this.db.getUser(this.UserName,this.Password)
          .then(res=>{
            console.log(res)
          })
        }
    });
  }

  renderRegister(){
    this.isLogin=!this.isLogin;

  }

  Register(){


    this.db.getDatabaseState().subscribe(rdy => {
        console.log(rdy);
        if(rdy){
          this.db.addUser(this.UserName,this.Password,this.UserTypeId)
          .then(res=>{
            console.log(res)
          })
        }
    });

  }

}
