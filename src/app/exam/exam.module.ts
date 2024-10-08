import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './../Shared/material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExamRoutingModule } from './exam-routing.module';
import { AllExamsComponent } from './Components/all-exams/all-exams.component';
import { AddExamComponent } from './Components/add-exam/add-exam.component';
import { EditExamComponent } from './Components/edit-exam/edit-exam.component';
import { AttemptExamComponent } from './Components/attempt-exam/attempt-exam.component';
import { RenderExamComponent } from './Components/render-exam/render-exam.component';
import { ChoiceQuestionComponent } from './Components/questions-render-exam/choice-question/choice-question.component';
import { MatchingQuestionComponent } from './Components/questions-render-exam/matching-question/matching-question.component';
import { MultibleAnswersQuestionComponent } from './Components/questions-render-exam/multible-answers-question/multible-answers-question.component';
import { TrueFalseQuestionComponent } from './Components/questions-render-exam/true-false-question/true-false-question.component';
import { ExamAnswersComponent } from './Components/exam-answers/exam-answers.component';
import { CodeQuestionComponent } from './Components/questions-render-exam/code-question/code-question.component';
import { ExamStudentsComponent } from './Components/exam-students/exam-students.component';

import { MonacoEditorModule } from 'ngx-monaco-editor-v2';
import { PreventUrlChangeGuard } from './guards/prevent-url-change.guard';
import { PreventRenderWithoutAttemptGuard } from './guards/hasVisitedAttemptRoute.guard';
import { AttemptExamByAppComponent } from './Components/attempt-exam-by-app/attempt-exam-by-app.component';

@NgModule({
  declarations: [
    AllExamsComponent,
    AddExamComponent,
    EditExamComponent,
    AttemptExamComponent,
    RenderExamComponent,
    ChoiceQuestionComponent,
    MatchingQuestionComponent,
    MultibleAnswersQuestionComponent,
    TrueFalseQuestionComponent,
    ExamAnswersComponent,
    CodeQuestionComponent,
    ExamStudentsComponent,
    AttemptExamByAppComponent
  ],
  imports: [
    CommonModule,
    ExamRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MonacoEditorModule.forRoot()
  ],
  providers: [
    PreventUrlChangeGuard,
    PreventRenderWithoutAttemptGuard
    ],

})
export class ExamModule { }
