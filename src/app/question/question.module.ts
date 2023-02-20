import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionRoutingModule } from './question-routing.module';
import { SaveQuestionComponent } from './save-question/save-question.component';
import { ChoiceQuestionsComponent } from './save-question/choice-questions/choice-questions.component';


@NgModule({
  declarations: [
    SaveQuestionComponent,
    ChoiceQuestionsComponent
  ],
  imports: [
    CommonModule,
    QuestionRoutingModule
  ]
})
export class QuestionModule { }
