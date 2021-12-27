import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DatabaseService } from 'src/app/common/Database/database.service';
import { StorageService } from 'src/app/common/Storage/storage.service';
import { User } from '../../login/login.models';
import { Test } from '../test.models';

@Component({
  selector: 'app-test-list',
  templateUrl: './test-list.component.html',
  styleUrls: ['./test-list.component.scss'],
})
export class TestListComponent implements OnInit {


  userInfo:User;
  @Input()  testlist:Test[]=[]
  @Output() selectedTest= new EventEmitter<any>();

  constructor(private db:DatabaseService,private storageService:StorageService) {



   }

  ngOnInit() {



  }



  selectTest(TestId){

    this.selectedTest.emit(TestId);
  }

}
