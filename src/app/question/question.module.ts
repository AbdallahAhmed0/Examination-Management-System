import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionRoutingModule } from './question-routing.module';
import { SaveQuestionComponent } from './save-question/save-question.component';
import { ChoiceQuestionsComponent } from './choice-questions/choice-questions.component';
import { MaterialModule } from '../Shared/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TextEditorComponent } from './text-editor/text-editor.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TextQuestionsComponent } from './text-questions/text-questions.component'

import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';


@NgModule({
  declarations: [
    SaveQuestionComponent,
    ChoiceQuestionsComponent,
    TextEditorComponent,
    TextQuestionsComponent
  ],
  imports: [
    CommonModule,
    QuestionRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,

    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot()

  ]
})
export class QuestionModule { }
