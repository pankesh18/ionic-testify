import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentTestPage } from './student-test.page';

const routes: Routes = [
  {
    path: '',
    component: StudentTestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentTestPageRoutingModule {}
