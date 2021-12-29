import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { element } from 'protractor';
import { DatabaseService } from 'src/app/common/Database/database.service';
import { StorageService } from 'src/app/common/Storage/storage.service';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { DocumentViewer ,DocumentViewerOptions} from '@awesome-cordova-plugins/document-viewer/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { Console } from 'console';
import { Router } from '@angular/router';
import { File } from '@awesome-cordova-plugins/file/ngx';



@Component({
  selector: 'app-testpad',
  templateUrl: './testpad.component.html',
  styleUrls: ['./testpad.component.scss'],
})
export class TestpadComponent implements OnInit {


  @Input() TestId:any;
  @Output() isSubmitted= new EventEmitter<boolean>();
  doc:any;
  questionlist: any[];
  AnswerList:any[]=[];
  userInfo: any;




  constructor(private db: DatabaseService, private storageService: StorageService,private fileChooser: FileChooser,private camera: Camera,private document: DocumentViewer,private filePath: FilePath, private router:Router, private file:File) {

   }

  ngOnInit() {
    this.storageService.getItem('UserInfo')
    .then(data=>{
      this.userInfo= JSON.parse(data);

    })
    this.getTestPadQuestions(this.TestId)
  }




  getTestPadQuestions(TestId){
    this.db.getDatabaseState().subscribe(rdy => {
        if(rdy){
          this.db.getTestPadQuestions(TestId)
          .then(data=>{

            if(data!=null && data!=undefined){
                this.questionlist=data;

                this.questionlist.forEach(element=>{
                  // element.OptionList= this.getQuestionItem(element.QuestionId)
                  if(element.QuestionAttachments.length>0){
                    element.Files= JSON.parse(element.QuestionAttachments)
                  }
                  else{
                    element.Files= []
                  }

                  element.Answer="";
                  this.db.getQuestionItem(element.QuestionId).then(options=>{
                    element.OptionList=options
                  })
                })
                console.log(this.questionlist)
            }
          })

        }
    });

  }


  getQuestionItem(QuestionId){

    return this.db.getDatabaseState().subscribe(rdy => {
        if(rdy){
          this.db.getQuestionItem(QuestionId)
          .then(data=>{
            console.log(data)
            if(data!=null && data!=undefined){
              return data;
            }
          })

        }
    });

  }


openFiles(QuestionId){

let index =this.questionlist.findIndex(item=>{
  return QuestionId==item.QuestionId
})


this.fileChooser.open()
  .then(uri =>{
    console.log(uri)

    this.questionlist[index].AnswerAttachment2=uri

  })
  .catch(e => console.log(e));
  }



openCamera(QuestionId){



  let index =this.questionlist.findIndex(item=>{
    return QuestionId==item.QuestionId
  })
  const options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }


  // this.camera.getPicture((imageData) => {
  //   // imageData is either a base64 encoded string or a file URI
  //   // If it's base64 (DATA_URL):
  //   let base64Image = 'data:image/jpeg;base64,' + imageData;
  //   this.questionlist[index].AnswerAttachment2=base64Image;

  //  },
  //  (err) => {
  //   console.log(err)
  //  },
  //  {
  //   quality: 100,
  //   destinationType: this.camera.DestinationType.FILE_URI,
  //   encodingType: this.camera.EncodingType.JPEG,
  //   mediaType: this.camera.MediaType.PICTURE
  // })

  this.camera.getPicture(options)
  .then((imageData) => {
    // imageData is either a base64 encoded string or a file URI
    // If it's base64 (DATA_URL):
    let base64Image = 'data:image/jpeg;base64,' + imageData;
    this.questionlist[index].AnswerAttachment1=base64Image;
    console.log(base64Image)
   }, (err) => {
    console.log(err)
   });
}

openFile(File){



  const options: DocumentViewerOptions = {
    title: 'My Document'
  }

  console.log("File :: "+File)

  this.filePath.resolveNativePath(File).then(url=>{
    console.log(url)
    this.document.viewDocument(url, 'application/pdf', options)
  })


}


fileView(){
  const options: DocumentViewerOptions = {
    title: 'My PDF'
  }
let path = this.file.applicationDirectory + 'www/assets'
  // this.document.viewDocument(`${path}Pankesh_CA_contribution.pdf`, 'application/pdf', options)
  this.file.listDir(path,"").then(data=>{
    console.log(data)
  })

this.fileChooser.open().then(uri=>
  {
    console.log(uri)
    this.filePath.resolveNativePath(uri).then(nativepath=>{

      console.log(nativepath)
      var dirName = nativepath.substring(0,nativepath.lastIndexOf('/'))
      var filename = nativepath.replace(/^.*[\\\/]/, '')

      this.document.viewDocument(nativepath,'application/pdf',options)
    })

  }

)


  // this.file.readAsDataURL(path,'Pankesh_CA_contribution.pdf').then(dataURL=>{
  //   console.log(dataURL)
  // })
}






submitTest(){

  this.questionlist.forEach(question=>{


    let index = question.OptionList.findIndex(x=> x.AnswerOptionId==question.Answer)

    var answer ={
      "QuestionId": question.QuestionId,
      "OptionSelected":question.Answer,
      "IsCorrect":  index>0 ? question.OptionList[index].IsCorrect : 0
    }

    console.log(answer)
    this.AnswerList.push(answer);

  })
  this.AddAnswers(this.AnswerList).add(this.submit()


  )


}


submit(){

  this.isSubmitted.emit(true);
  this.router.navigate(['/home/result'])
}

AddAnswers(AnswerList){



  return this.db.getDatabaseState().subscribe(rdy => {
      if(rdy){
        AnswerList.forEach(async answer => {
          await this.db.addAnswer(answer.QuestionId, answer.OptionSelected,answer.IsCorrect,this.userInfo.UserId)
        });

      }
  });

}


}
