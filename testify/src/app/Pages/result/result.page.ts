import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/common/Database/database.service';
import { StorageService } from 'src/app/common/Storage/storage.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.page.html',
  styleUrls: ['./result.page.scss'],
})
export class ResultPage implements OnInit {
  testlist: any[]=[];
  userInfo: any;

  constructor(private db: DatabaseService, private storageService: StorageService) { }

  ngOnInit() {
    this.storageService.getItem('UserInfo')
    .then(data=>{
      this.userInfo= JSON.parse(data);
      this.getTestList()
    })
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
                this.testlist.forEach(test=>{
                  this.db.getCorrectQuestion(test.TestId).then(res=>{
                    test.Result=res;
                    console.log(test)
                  })

                })


            }
          })

        }
    });

  }

  getScoreFromResult(result){
    if(result!==null && result!==undefined){
      let index = result.findIndex(x=>{ return x.IsCorrect===1})
      return result[index].Count;
    }
    return 0
  }

  getTotalFromResult(result){
    if(result!==null && result!==undefined){

      return result[0].Count+result[1].Count;
    }
    return 0
  }




  // getCorrectQuestion(){
  //   this.testlist=undefined;
  //   this.db.getDatabaseState().subscribe(rdy => {
  //       if(rdy){
  //         this.db.getCorrectQuestion()
  //         .then(data=>{
  //           console.log(data)
  //           if(data!=null && data!=undefined){
  //               this.testlist=data;

  //           }
  //         })

  //       }
  //   });

  // }


}
