
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./Pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./Pages/login/login.module').then( m => m.LoginPageModule)
  }
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
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
