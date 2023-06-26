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
import { PreventUrlChangeGuard } from './prevent-url-change.guard';
import { PreventRenderWithoutAttemptGuard } from './hasVisitedAttemptRoute.guard';
import { AttemptExamByAppComponent } from './Components/attempt-exam-by-app/attempt-exam-by-app.component';

const routes: Routes = [
  {path: '', component:AllExamsComponent},
  {path:'add',component:AddExamComponent},
  {path:'edit/:id',component:EditExamComponent},
  {path:'attempt/:examId',component:AttemptExamComponent},
  {path:'attemptByApp/:examId',component:AttemptExamByAppComponent},
  {path:'render/:id',component:RenderExamComponent,
  canDeactivate: [PreventUrlChangeGuard],
  canActivate: [PreventRenderWithoutAttemptGuard]

},
  {path:'showAnswers/:attemptId',component:ExamAnswersComponent},
  {path:'code',component:CodeQuestionComponent},
  {path:"showStudents/:id",component:ExamStudentsComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExamRoutingModule { }
