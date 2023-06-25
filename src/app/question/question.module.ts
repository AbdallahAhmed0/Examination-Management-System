import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionRoutingModule } from './question-routing.module';
import { SaveQuestionComponent } from './Components/save-question/save-question.component';
import { ChoiceQuestionsComponent } from './Components/choice-questions/choice-questions.component';
import { MaterialModule } from '../Shared/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TextEditorComponent } from './Components/text-editor/text-editor.component';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TextQuestionsComponent } from './Components/text-questions/text-questions.component'

import { CodeQuestionComponent } from './Components/code-question/code-question.component';
import { TrueFalseQuestionComponent } from './Components/true-false-question/true-false-question.component';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { ImportQuestionsComponent } from './Components/import-questions/import-questions.component';
import { JwtInterceptor } from '../login/Interceptors/jwt.interceptor';


@NgModule({
  declarations: [
    SaveQuestionComponent,
    ChoiceQuestionsComponent,
    TextEditorComponent,
    TextQuestionsComponent,
    CodeQuestionComponent,
    TrueFalseQuestionComponent,
    ImportQuestionsComponent,
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

  ],
  providers:[
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }

  ]
})
export class QuestionModule { }
