import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/common/Database/database.service';
import { Output, EventEmitter } from '@angular/core';


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

  constructor(private db: DatabaseService) { }

  ngOnInit() {

    this.getQuestionType();
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
      console.log("Cannot select more than one")
    }
    if(correctOptions.length===0){
      console.log("Please select one option correct")
    }
  }


  AddQuestion(){

    let question ={
      "QuestionBody" : this.QuestionBody,
      "QuestionTypeId": this.selectedQuestionType,
      "TopicId":  this.isExisitngTopic? this.selectedTopic:0,
      "TopicName": this.isExisitngTopic? null : this.Topic,
      "OptionList":this.OptionList
    }

    this.QuestionList.push(question);

    this.QuestionBody=undefined;
    this.selectedQuestionType=undefined;
    this.selectedTopic=undefined;
    this.Topic=undefined;
    this.isExisitngTopic=false;

    this.OptionBody=undefined;
    this.OptionList=[];

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
