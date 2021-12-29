import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/common/Database/database.service';
import { StorageService } from 'src/app/common/Storage/storage.service';
import { ToastController } from '@ionic/angular';
import { AlertController , MenuController} from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  userInfo: any;
  ischangePassword:boolean=false;
  CurrentPassword:any;
  NewPassword:any;
  constructor(private db: DatabaseService, private storageService: StorageService,private toastController: ToastController,private alertController: AlertController) { }

  ngOnInit() {

    this.storageService.getItem('UserInfo')
    .then(data=>{
      this.userInfo= JSON.parse(data);


    })

  }

  changePassword(){


    if(this.CurrentPassword!==this.userInfo.Password){

    this.presentToast('Current Password is incorrect!!')
      return
    }
    else if(this.NewPassword===this.userInfo.Password){
      this.presentToast('New Password is same as Old!!')
      return
    }

    else{
      this.db.getDatabaseState().subscribe(rdy => {
        if(rdy){
          this.db.updatePassword(this.NewPassword,this.userInfo.UserId).subscribe((result) => {
            this.presentToast('Login again!')
            this.ischangePassword=false;
            this.logout()
          })

        }
      });


    }



  }

  logout(){
    this.storageService.clearStorage()
    this.storageService.checkSession();
  }


  presentToast(Message:string) {
    this.toastController.create({
      message: Message,
      duration: 2000
    }).then(toast=>{
      toast.present();
    }
    )

  }


  AlertConfirm() {
    // this.logout()

    this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm',
      message: 'Do you want to logout?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          id: 'cancel-button',
          handler: (blah) => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Yes',
          id: 'confirm-button',
          handler: () => {
            console.log('Confirm yes');
            this.logout()
          }
        }
      ]
    }).then(alert=>{
      alert.present().then(data=>{

      }).catch(reason=>{
        console.log(reason)
      })
    }).catch(reason=>{
      console.log(reason)
    })


  }



}
