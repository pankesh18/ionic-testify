import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import { StorageService } from 'src/app/common/Storage/storage.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule
  ],
  providers:[File],
  exports:[LoginPage],
  declarations: [LoginPage]
})
export class LoginPageModule {}
