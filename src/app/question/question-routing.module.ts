import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChoiceQuestionsComponent } from './choice-questions/choice-questions.component';
import { SaveQuestionComponent } from './save-question/save-question.component';

const routes: Routes = [
  // {path:'',component:SaveQuestionComponent},
  {path:'',component:ChoiceQuestionsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionRoutingModule { }
