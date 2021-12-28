
import { Component, NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomePage } from './Pages/home/home.page';
import { LoginPage } from './Pages/login/login.page';
import { ResultPage } from './Pages/result/result.page';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component:HomePage
  },
  {
    path:"login",
    component:LoginPage
  }

  // ,
  // {
  //   path: 'home',
  //   loadChildren: () => import('./Pages/home/home.module').then( m => m.HomePageModule)
  // },
  // {
  //   path: 'login',
  //   loadChildren: () => import('./Pages/login/login.module').then( m => m.LoginPageModule)
  // }
  // ,
  // {
  //   path: 'student-test',
  //   loadChildren: () => import('./Pages/student-test/student-test.module').then( m => m.StudentTestPageModule)
  // }
  // ,
  // {
  //   path: 'test',
  //   loadChildren: () => import('./Pages/test/test.module').then( m => m.TestPageModule)
  // }


  ,{ path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
