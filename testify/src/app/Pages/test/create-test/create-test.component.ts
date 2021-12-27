import { Component, OnInit } from '@angular/core';
import { User } from '../../login/login.models';
import { StorageService } from 'src/app/common/Storage/storage.service';
import {Test} from '../test.models'
import { Output, EventEmitter } from '@angular/core';
import { DatabaseService } from 'src/app/common/Database/database.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-create-test',
  templateUrl: './create-test.component.html',
  styleUrls: ['./create-test.component.scss'],
})
export class CreateTestComponent implements OnInit {

  userInfo:User;
  test:Test=new Test();
  courseList:any[]=[]

  @Output() OutTestInfo = new EventEmitter<Test>();

  constructor(private storageService:StorageService, private db: DatabaseService,private toastController: ToastController) {

    this.storageService.getItem('UserInfo')
    .then(data=>{
      this.userInfo= JSON.parse(data);

    })
  }

  ngOnInit() {

    this.getCourseList()
  }


  AddTestInfo(){

    if(this.test.TestName==undefined||this.test.TestName==null||this.test.TestName==""){
      this.presentToast("Please Enter Test Name")
      return
    }
    if(this.test.CourseId==undefined||this.test.CourseId==null||this.test.CourseId==0){
      this.presentToast("Please Select Course")
      return
    }


    this.test.CreatedBy=this.userInfo.UserId;
    this.OutTestInfo.emit(this.test);
  }


  presentToast(Message:string) {
    this.toastController.create({
      message: Message,
      position: 'top',
      color:'danger',
      icon: 'warning',
      duration: 2000
    }).then(toast=>{
      toast.present();
    })

  }



  getCourseList(){
    this.db.getDatabaseState().subscribe(rdy => {
        if(rdy){
          this.db.getCourseList()
          .then(data=>{
            console.log(data)
            if(data!=null && data!=undefined){
              this.courseList=data;
            }
          })

        }
    });

  }


}
