import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TestPageRoutingModule } from './test-routing.module';

import { TestPage } from './test.page';
import { CreateTestComponent } from './create-test/create-test.component';
import { AddQuestionComponent } from './add-question/add-question.component';
import {EditorModule} from 'primeng/editor';
import { TestListComponent } from './test-list/test-list.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditorModule,
    TestPageRoutingModule

  ],
  declarations: [TestPage, CreateTestComponent,AddQuestionComponent,TestListComponent]
})
export class TestPageModule {}
