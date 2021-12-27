import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/common/Database/database.service';
import { Output, EventEmitter } from '@angular/core';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.scss'],
})
export class AddQuestionComponent implements OnInit {


  @Output() OutQuestionList = new EventEmitter<any>();

  QuestionList:any[]=[];
  QuestionType:any[];
  OptionList:any[]=[];
  TopicList:any[]=[];
  isTopicList:boolean=false;

  OptionBody:any;
  selectedQuestionType:any;
  selectedTopic:any;
  Topic:any;
  isExisitngTopic:boolean=false;
  QuestionBody:any;

  constructor(private db: DatabaseService,private toastController: ToastController) { }

  ngOnInit() {

    this.getQuestionType();
    this.getExstingTopics();
    this.selectedQuestionType=1;
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


  addOption(OptionBody){
   this.OptionList.push({
     "OptionBody": OptionBody,
     "IsCorrect": false
   })
   this.OptionBody=undefined;
  }

  correctSelected(){
    let correctOptions= this.OptionList.filter(x=>{ return x.IsCorrect==true});

    if(correctOptions.length>1){
      this.presentToast("Cannot select more than one")
      return false
    }
    if(correctOptions.length===0){
      this.presentToast("Please select one option correct")
      return false
    }
    return true
  }


  AddQuestion(){


    if(this.QuestionBody==undefined||this.QuestionBody==null||this.QuestionBody==""){
      this.presentToast('Please Enter Question')
      return
    }
    if(this.isExisitngTopic && (this.selectedTopic==undefined || this.selectedTopic==0 ||this.selectedTopic==null)){
      this.presentToast('Please Select Topic')
      return
    }
    if(!this.isExisitngTopic && (this.Topic==undefined || this.Topic=="" ||this.Topic==null)){
      this.presentToast('Please Enter Topic')
      return
    }
    if(this.OptionList==undefined ||this.OptionList==null || this.OptionList.length==0 ){
      this.presentToast('Please Add Options')
      return
    }

    if(!this.correctSelected()){
      return
    }


    let question ={
      "QuestionBody" : this.QuestionBody,
      "QuestionTypeId": this.selectedQuestionType,
      "TopicId":  this.isExisitngTopic? this.selectedTopic:0,
      "TopicName": this.isExisitngTopic? null : this.Topic,
      "OptionList":this.OptionList
    }

    this.QuestionList.push(question);

    this.QuestionBody=undefined;
    this.selectedTopic=undefined;
    this.Topic=undefined;
    this.isExisitngTopic=false;
    this.OptionBody=undefined;
    this.OptionList=[];


    this.submitQuestions()

  }


  submitQuestions(){
    this.OutQuestionList.emit(this.QuestionList)
  }


  getQuestionType(){
    this.db.getDatabaseState().subscribe(rdy => {
        if(rdy){
          this.db.getQuestionType()
          .then(data=>{
            console.log(data)
            if(data!=null && data!=undefined){
              this.QuestionType=data;
            }
          })

        }
    });

  }


  getExstingTopics(){
    this.isExisitngTopic=false;
    this.db.getDatabaseState().subscribe(rdy => {
        if(rdy){
          this.db.getTopicsList()
          .then(data=>{
            console.log(data)
            if(data!=null && data!=undefined){
              this.TopicList=data;
              this.isTopicList=true;
            }
          })

        }
    });

  }


}
