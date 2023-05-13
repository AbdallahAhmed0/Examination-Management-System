import { AttemptExamComponent } from './Components/attempt-exam/attempt-exam.component';
import { EditExamComponent } from './Components/edit-exam/edit-exam.component';
import { AddExamComponent } from './Components/add-exam/add-exam.component';
import { AllExamsComponent } from './Components/all-exams/all-exams.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RenderExamComponent } from './Components/render-exam/render-exam.component';
import { ExamAnswersComponent } from './Components/exam-answers/exam-answers.component';

const routes: Routes = [
  {path: '', component:AllExamsComponent},
  {path:'exams',component:AllExamsComponent},
  {path:'exams/add',component:AddExamComponent},
  {path:'exams/edit/:id',component:EditExamComponent},
  {path:'exams/attempt/:examId',component:AttemptExamComponent},
  {path:'exams/render/:id',component:RenderExamComponent},
  {path:'exams/showAnswers/:attemptId',component:ExamAnswersComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExamRoutingModule { }
