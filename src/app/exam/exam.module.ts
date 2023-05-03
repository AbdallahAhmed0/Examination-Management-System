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


@NgModule({
  declarations: [
    AllExamsComponent,
    AddExamComponent,
    EditExamComponent,
    AttemptExamComponent,
    RenderExamComponent
  ],
  imports: [
    CommonModule,
    ExamRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ExamModule { }
