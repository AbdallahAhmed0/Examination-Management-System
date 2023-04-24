import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SaveQuestionComponent } from './save-question/save-question.component';
import { TextEditorComponent } from './text-editor/text-editor.component';
import { ImportQuestionsComponent } from './import-questions/import-questions.component';

const routes: Routes = [
  {path:'',component:SaveQuestionComponent},
  {path:'import',component:ImportQuestionsComponent},
  {path:'editor',component:TextEditorComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionRoutingModule { }
