import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudentTestPageRoutingModule } from './student-test-routing.module';

import { StudentTestPage } from './student-test.page';
import { TestpadComponent } from './testpad/testpad.component';
import { StudentTestlistComponent } from './student-testlist/student-testlist.component';
import {SplitterModule} from 'primeng/splitter';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SplitterModule,
    StudentTestPageRoutingModule
  ],
  declarations: [StudentTestPage, TestpadComponent, StudentTestlistComponent]
})
export class StudentTestPageModule {}
