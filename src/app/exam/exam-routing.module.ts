import { AttemptExamComponent } from './Components/attempt-exam/attempt-exam.component';
import { EditExamComponent } from './Components/edit-exam/edit-exam.component';
import { AddExamComponent } from './Components/add-exam/add-exam.component';
import { AllExamsComponent } from './Components/all-exams/all-exams.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RenderExamComponent } from './Components/render-exam/render-exam.component';
import { ExamAnswersComponent } from './Components/exam-answers/exam-answers.component';
import { CodeQuestionComponent } from './Components/questions-render-exam/code-question/code-question.component';
import { ExamStudentsComponent } from './Components/exam-students/exam-students.component';
import { PreventUrlChangeGuard } from './guards/prevent-url-change.guard';
import { PreventRenderWithoutAttemptGuard } from './guards/hasVisitedAttemptRoute.guard';
import { AttemptExamByAppComponent } from './Components/attempt-exam-by-app/attempt-exam-by-app.component';
import { ExamGuard } from './guards/exam.guard';

const routes: Routes = [
  {path: '', canActivate:[ExamGuard] , component:AllExamsComponent},
  {path:'add',canActivate:[ExamGuard] ,component:AddExamComponent},
  {path:'edit/:id',canActivate:[ExamGuard] ,component:EditExamComponent},
  {path:'attempt/:examId',canActivate:[ExamGuard],component:AttemptExamComponent},
  {path:'attemptByApp/:examId',canActivate:[ExamGuard],component:AttemptExamByAppComponent},
  {path:'render/:id',component:RenderExamComponent,
  canDeactivate: [PreventUrlChangeGuard],
  canActivate: [PreventRenderWithoutAttemptGuard]

},
  {path:'showAnswers/:attemptId',canActivate:[ExamGuard],component:ExamAnswersComponent},
  {path:'code',canActivate:[ExamGuard],component:CodeQuestionComponent},
  {path:"showStudents/:id",canActivate:[ExamGuard],component:ExamStudentsComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers:[ExamGuard]
})
export class ExamRoutingModule { }
