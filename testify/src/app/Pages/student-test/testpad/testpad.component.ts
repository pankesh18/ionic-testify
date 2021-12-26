import { Component, Input, OnInit } from '@angular/core';
import { element } from 'protractor';
import { DatabaseService } from 'src/app/common/Database/database.service';
import { StorageService } from 'src/app/common/Storage/storage.service';

@Component({
  selector: 'app-testpad',
  templateUrl: './testpad.component.html',
  styleUrls: ['./testpad.component.scss'],
})
export class TestpadComponent implements OnInit {


  @Input() TestId:any;
  questionlist: any[];



  constructor(private db: DatabaseService, private storageService: StorageService) { }

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

}
