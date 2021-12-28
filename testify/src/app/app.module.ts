import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { IonicStorageModule } from '@ionic/storage-angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { SQLitePorter } from '@awesome-cordova-plugins/sqlite-porter/ngx';
import { HttpClientModule } from '@angular/common/http';
import { StorageService } from './common/Storage/storage.service';
import {EditorModule} from 'primeng/editor';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { DeviceOrientation } from '@ionic-native/device-orientation/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { DocumentViewer } from '@awesome-cordova-plugins/document-viewer/ngx';
import { LoginPageModule } from './Pages/login/login.module';
import { StudentTestPageModule } from './Pages/student-test/student-test.module';
import { TestPageModule } from './Pages/test/test.module';
import { HomePageModule } from './Pages/home/home.module';
import { ResultPageModule } from './Pages/result/result.module';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,
     IonicModule.forRoot(),

     HttpClientModule,
     EditorModule,
     HomePageModule,
     LoginPageModule,
     StudentTestPageModule,
     ResultPageModule,
     TestPageModule ,
     IonicStorageModule.forRoot(),
     AppRoutingModule
    ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },SQLite , SQLitePorter,FileChooser,Camera, DeviceOrientation, FilePath, DocumentViewer],
  bootstrap: [AppComponent],
})
export class AppModule {}
