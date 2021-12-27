import { Component, Input, OnInit } from '@angular/core';
import { element } from 'protractor';
import { DatabaseService } from 'src/app/common/Database/database.service';
import { StorageService } from 'src/app/common/Storage/storage.service';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { DocumentViewer ,DocumentViewerOptions} from '@awesome-cordova-plugins/document-viewer/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';


@Component({
  selector: 'app-testpad',
  templateUrl: './testpad.component.html',
  styleUrls: ['./testpad.component.scss'],
})
export class TestpadComponent implements OnInit {


  @Input() TestId:any;
  questionlist: any[];





  constructor(private db: DatabaseService, private storageService: StorageService,private fileChooser: FileChooser,private camera: Camera,private document: DocumentViewer,private filePath: FilePath) {


   }

  ngOnInit() {

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

//   console.log("indexes  ::  "+qIndex + ":::"+fIndex);

//  let qFileList= JSON.parse(this.questionlist[qIndex].QuestionAttachments)

//  console.log(qFileList);

//  let File=qFileList[fIndex].File


 console.log(File);

  const options: DocumentViewerOptions = {
    title: 'My PDF'
  }

  console.log("File :: "+File)

  this.filePath.resolveNativePath(File).then(url=>{
    console.log(url)
    this.document.viewDocument(url, 'application/pdf', options, function(){

    } , ()=>{

    }, ()=>{

    },(error: any)=>{
      console.log("Error :: "+error)
    })
  })


}


submitTest(){

  this.questionlist.forEach(question=>{
    console.log(question.Answer);
  })

}


}
