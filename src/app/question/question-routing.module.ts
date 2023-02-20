import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SaveQuestionComponent } from './save-question/save-question.component';

const routes: Routes = [
  {path:'',component:SaveQuestionComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionRoutingModule { }
