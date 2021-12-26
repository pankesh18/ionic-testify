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




@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,
     IonicModule.forRoot(),
     AppRoutingModule,
     HttpClientModule,
     EditorModule,
     IonicStorageModule.forRoot()
    ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },SQLite , SQLitePorter],
  bootstrap: [AppComponent],
})
export class AppModule {}
