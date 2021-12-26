import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/common/Database/database.service';
import { StorageService } from 'src/app/common/Storage/storage.service';
import { User } from '../login/login.models';
import {Question, Test} from './test.models'


@Component({
  selector: 'app-test',
  templateUrl: './test.page.html',
  styleUrls: ['./test.page.scss'],
})
export class TestPage implements OnInit {

  objTest:Test=new Test();
  pageSquenceNo:number=1;
  userInfo: User;
  testlist: Test[];
  constructor(private db: DatabaseService, private storageService: StorageService) { }

  ngOnInit() {
    this.storageService.getItem('UserInfo')
    .then(data=>{
      this.userInfo= JSON.parse(data);
      this.getTestList();
    })
  }


  getTestInfo(testInfo: any) {
    console.log(testInfo);
    this.objTest.TestName=testInfo.TestName
    this.objTest.CourseId=testInfo.CourseId
    this.objTest.CreatedBy=testInfo.CreatedBy
    this.pageSquenceNo=2;

  }



  getQuestionList(QuestionList: any) {

    QuestionList.forEach(element => {
      let question= new Question()
      question.QuestionBody=element.QuestionBody
      question.QuestionTypeId=element.QuestionTypeId
      question.TopicId=element.TopicId
      question.TopicName=element.TopicName
      question.OptionList=element.OptionList
      this.objTest.QuestionList.push(question)
    });


    console.log(QuestionList);
    this.pageSquenceNo=1;
  }




  createTest(){
    this.db.getDatabaseState().subscribe(rdy => {
      if(rdy){



        this.db.addTest(this.objTest.TestName  ,this.objTest.CourseId, this.objTest.CreatedBy)
        .subscribe(data=>{
          console.log(data)
          this.objTest.TestId=data
          this.getTestList();
          // this.presentToast('User Account Created!')
          // this.renderRegister();
        })


        this.objTest.QuestionList.forEach(item=>{
          if(item.TopicId===0){
            this.db.addTopic(item.TopicName).subscribe(data=>{
              item.TopicId=data
              console.log(data)

              this.db.addQuestion(item.QuestionBody, item.QuestionTypeId, item.TopicId, this.objTest.TestId).subscribe(rowid=>{
                item.QuestionId=rowid;

                if(item.QuestionTypeId===1){
                  item.OptionList.forEach(option=>{
                    this.db.addOption(option.OptionBody,	option.IsCorrect	,item.QuestionId)
                  })

                }
              })
            })

          }
          else{
            this.db.addQuestion(item.QuestionBody, item.QuestionTypeId, item.TopicId, this.objTest.TestId).subscribe(rowid=>{
              item.QuestionId=rowid;

              if(item.QuestionTypeId===1){
                item.OptionList.forEach(option=>{
                  this.db.addOption(option.OptionBody,	option.IsCorrect	,item.QuestionId)
                })

              }
            })
          }




        })





      }
  });
  }

  getTestList(){
    this.db.getDatabaseState().subscribe(rdy => {
        if(rdy){
          this.db.getTestList(this.userInfo.UserId)
          .then(data=>{
            console.log(data)
            if(data!=null && data!=undefined){
                this.testlist=data;
            }
          })

        }
    });

  }

}
