import { Component, OnInit } from '@angular/core';

import { File } from '@awesome-cordova-plugins/file/ngx';
import { ToastController } from '@ionic/angular';
import { DatabaseService } from 'src/app/common/Database/database.service';
import { StorageService } from 'src/app/common/Storage/storage.service';
import { LoginService } from './login.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

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
  constructor(private router: Router,private route: ActivatedRoute,private file: File,private db: DatabaseService, private login :LoginService,private storageService:StorageService,private toastController: ToastController) {

  this.storageService.checkSession();

   }

  ngOnInit() {

  }

  validateLogin(){
    this.db.getDatabaseState().subscribe(rdy => {
        if(rdy){
          this.db.getUser(this.UserName,this.Password)
          .then(data=>{
            console.log(data)
            if(data!=null && data!=undefined){
              this.storageService.setItem('UserInfo',JSON.stringify(data));
              this.storageService.checkSession();

            }
            else{
              this.presentToast('Invalid Login!')
            }

          })

        }
    });



  }

  renderRegister(){
    this.isLogin=!this.isLogin;
    this.UserName=undefined;
    this.Password=undefined;
    this.UserTypeId=undefined;
  }

  Register(){
    this.db.getDatabaseState().subscribe(rdy => {
        if(rdy){
          this.db.addUser(this.UserName,this.Password,this.UserTypeId)
          .subscribe(data=>{
            console.log(data)
            this.presentToast('User Account Created!')
            this.renderRegister();
          })

        }
    });

  }

  async presentToast(Message:string) {
    const toast = await this.toastController.create({
      message: Message,
      duration: 2000
    });
    toast.present();
  }




}
