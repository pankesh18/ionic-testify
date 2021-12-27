import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';
import { AlertController } from '@ionic/angular';
import { HomePage } from './home.page';
import { TestPageModule } from '../test/test.module';
import { StudentTestPageModule } from '../student-test/student-test.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    // TestPageModule,
    // StudentTestPageModule,
    HomePageRoutingModule
  ],
  exports:[HomePage],
  providers:[],
  declarations: [HomePage]
})
export class HomePageModule {}
