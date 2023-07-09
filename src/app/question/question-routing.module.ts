import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SaveQuestionComponent } from './Components/save-question/save-question.component';
import { ImportQuestionsComponent } from './Components/import-questions/import-questions.component';

const routes: Routes = [
  { path: '', component: SaveQuestionComponent },
  { path: 'import', component: ImportQuestionsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionRoutingModule { }
