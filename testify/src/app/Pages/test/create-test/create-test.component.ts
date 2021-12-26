import { Component, OnInit } from '@angular/core';
import { User } from '../../login/login.models';
import { StorageService } from 'src/app/common/Storage/storage.service';
import {Test} from '../test.models'
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-create-test',
  templateUrl: './create-test.component.html',
  styleUrls: ['./create-test.component.scss'],
})
export class CreateTestComponent implements OnInit {

  userInfo:User;
  test:Test=new Test();
  courseList:any[]=[
    {
      "CourseId" : 1,
      "CourseName" : "Maths"
    },
    {
      "CourseId" : 2,
      "CourseName" : "Physics"
    },
    {
      "CourseId" : 3,
      "CourseName" : "Chemistry"
    },
    {
      "CourseId" : 4,
      "CourseName" : "Literature"
    }
  ]

  @Output() OutTestInfo = new EventEmitter<Test>();

  constructor(private storageService:StorageService) {

    this.storageService.getItem('UserInfo')
    .then(data=>{
      this.userInfo= JSON.parse(data);

    })
  }

  ngOnInit() {}


  AddTestInfo(){
    this.test.CreatedBy=this.userInfo.UserId;
    this.OutTestInfo.emit(this.test);
  }
}
