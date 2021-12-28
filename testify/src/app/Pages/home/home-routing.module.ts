import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResultPage } from '../result/result.page';
import { StudentTestPage } from '../student-test/student-test.page';
import { TestPage  } from '../test/test.page';

import { HomePage } from './home.page';

const routes: Routes = [

  {
    path:'',
    component:HomePage
  },
  {
    path:"home",
    component:HomePage,
    children:[
      {
              path:'test', component: TestPage
      },
      {
              path:'studenttest', component: StudentTestPage
      }
      ,
      {
              path:'result', component: ResultPage
      }
    ]
  }


  // {
  //   path: 'home',
  //   component: HomePage,
  //   children:[
  //     {
  //       path:'test', component: TestPage
  //     },
  //     {
  //       path:'studenttest', component: StudentTestPage
  //     }
  //   ]
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
