import { Component, OnInit } from '@angular/core';
import { File } from '@awesome-cordova-plugins/file/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  isLogin:boolean=true;
  UserName:string;
  Password:string;

  constructor(private file: File) { }

  ngOnInit() {
  }

  validateLogin(){

  }

  renderRegister(){
    this.isLogin=!this.isLogin;

  }

  Register(){

    let user={
      "Username": this.UserName,
      "Password": this.Password
    }



  }

}
