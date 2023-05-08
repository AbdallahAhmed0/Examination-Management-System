import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecoveryPasswordComponent } from './dashboard/recovery-password/recovery-password.component';

const routes: Routes = [
  {path:"forget",component:RecoveryPasswordComponent},
  {path:"admins",loadChildren:()=>import('./admins/admins.module').then(a=>a.AdminsModule)},
  {path:"roles",loadChildren:()=>import('./roles/roles.module').then(m=>m.RolesModule)},
  {path:"students",loadChildren:()=>import('./students/students.module').then(m=>m.StudentsModule)},
  {path:"exams",loadChildren:()=>import('./exam/exam.module').then(m=>m.ExamModule)},
  {path:"save/:id",loadChildren:()=>import('./question/question.module').then(m=>m.QuestionModule)},
  {path:"courses",loadChildren:()=>import('./course/course.module').then(m=>m.CourseModule)},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],

  exports: [RouterModule]
})
export class AppRoutingModule { }

