import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChoiceQuestionsComponent } from './choice-questions/choice-questions.component';
import { EditQuestionsComponent } from './edit-questions/edit-questions.component';
import { SaveQuestionComponent } from './save-question/save-question.component';
import { TextEditorComponent } from './text-editor/text-editor.component';
import { TextQuestionsComponent } from './text-questions/text-questions.component';

const routes: Routes = [
  {path:'',component:SaveQuestionComponent},
  {path:'choice',component:ChoiceQuestionsComponent},
  {path:'text',component:TextQuestionsComponent},
  {path:'editor',component:TextEditorComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionRoutingModule { }
