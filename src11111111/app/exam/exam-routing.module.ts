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

const routes: Routes = [
  {path: '', component:AllExamsComponent},
  {path:'exams/add',component:AddExamComponent},
  {path:'exams/edit/:id',component:EditExamComponent},
  {path:'exams/attempt/:examId',component:AttemptExamComponent},
  {path:'exams/render/:id',component:RenderExamComponent,
  canDeactivate: [PreventUrlChangeGuard],
  canActivate: [PreventRenderWithoutAttemptGuard]

},
  {path:'exams/showAnswers/:attemptId',component:ExamAnswersComponent},
  {path:'exams/code',component:CodeQuestionComponent},
  {path:"exams/showStudents/:id",component:ExamStudentsComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExamRoutingModule { }