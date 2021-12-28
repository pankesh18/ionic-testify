import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student-test',
  templateUrl: './student-test.page.html',
  styleUrls: ['./student-test.page.scss'],
})
export class StudentTestPage implements OnInit {

  testId:any;
  pageSquence:number=1;
  constructor() { }

  ngOnInit() {
  }

  gettestId(testId){
    this.testId=testId;
    this.pageSquence=2;
    console.log(this.testId)
  }

  isSubmitted(){
    this.pageSquence=1
  }
}
