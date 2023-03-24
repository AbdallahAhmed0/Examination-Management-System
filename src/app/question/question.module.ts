import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionRoutingModule } from './question-routing.module';
import { SaveQuestionComponent } from './save-question/save-question.component';
import { ChoiceQuestionsComponent } from './choice-questions/choice-questions.component';
import { MaterialModule } from '../Shared/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SaveQuestionComponent,
    ChoiceQuestionsComponent
  ],
  imports: [
    CommonModule,
    QuestionRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    

  ]
})
export class QuestionModule { }
