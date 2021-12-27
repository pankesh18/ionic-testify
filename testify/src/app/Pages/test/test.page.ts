import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/common/Database/database.service';
import { StorageService } from 'src/app/common/Storage/storage.service';
import { User } from '../login/login.models';
import {Question, Test} from './test.models'
import { ToastController } from '@ionic/angular';
import { FilePath } from '@ionic-native/file-path/ngx';


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
  constructor(private db: DatabaseService, private storageService: StorageService,private toastController: ToastController,private filePath: FilePath) { }

  ngOnInit() {
    this.storageService.getItem('UserInfo')
    .then(data=>{
      this.userInfo= JSON.parse(data);
      this.getTestList();
    })
  }


  goToAddTest() {

    this.pageSquenceNo=2;

  }



  getTestInfo(testInfo: any) {
    console.log(testInfo);
    this.objTest.TestName=testInfo.TestName
    this.objTest.CourseId=testInfo.CourseId
    this.objTest.CreatedBy=testInfo.CreatedBy
    this.pageSquenceNo=3;

  }



  getQuestionList(QuestionList: any) {

    QuestionList.forEach(element => {
      let question= new Question()
      question.QuestionBody=element.QuestionBody
      question.QuestionTypeId=element.QuestionTypeId
      question.TopicId=element.TopicId
      question.TopicName=element.TopicName
      question.OptionList=element.OptionList
      question.QuestionImageList=element.QuestionImageList
      question.QuestionFileList=element.QuestionFileList
      question.QuestionFileNameList=element.QuestionFileNameList
      this.objTest.QuestionList.push(question)
    });


    console.log(this.objTest);

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


  createTest(){



    if(!(this.objTest.QuestionList.length>0)){
      this.presentToast('Please Add Questions')
      return
    }


    this.db.getDatabaseState().subscribe(rdy => {
      if(rdy){



        this.db.addTest(this.objTest.TestName  ,this.objTest.CourseId, this.objTest.CreatedBy)
        .subscribe(data=>{
          console.log(data)
          this.objTest.TestId=data
          this.getTestList();
        })


        this.objTest.QuestionList.forEach((item,qIndex)=>{
          let  QuestionAttachments=[]
          if(item.QuestionImageList.length>0){

            let img=""
            item.QuestionImageList.forEach(qImage=>{


              img= img + `<a download="QuestionImage.jpg" href="${qImage}">
                            <img alt="QuestionImage" src="${qImage}">
                          </a>`
            })

            item.QuestionBody = item.QuestionBody + `<p>Questions Images : </p></br>` + img
          }

          if(item.QuestionFileList.length>0){
            let file=""

            item.QuestionFileList.forEach((qFile,index)=>{
              file=file+ `<a onclick="openFile(${qIndex},${index})">File</a>`

              QuestionAttachments.push({
                "File":qFile,
                "Index": index
              })
            })
            item.QuestionBody = item.QuestionBody + `<p>Questions Files : </p></br>` + file
          }


          if(item.TopicId===0){
            this.db.addTopic(item.TopicName).subscribe(data=>{
              item.TopicId=data
              console.log(data)

              this.db.addQuestion(item.QuestionBody, item.QuestionTypeId, item.TopicId, this.objTest.TestId, JSON.stringify(QuestionAttachments) ).subscribe(rowid=>{
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
            this.db.addQuestion(item.QuestionBody, item.QuestionTypeId, item.TopicId, this.objTest.TestId,JSON.stringify(QuestionAttachments)).subscribe(rowid=>{
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
    this.testlist=undefined;
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
