import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:"admins",loadChildren:()=>import('./admins/admins.module').then(a=>a.AdminsModule)},
  {path:"roles",loadChildren:()=>import('./roles/roles.module').then(m=>m.RolesModule)},
  {path:"students",loadChildren:()=>import('./students/students.module').then(m=>m.StudentsModule)},
  {path:"exams",loadChildren:()=>import('./exam/exam.module').then(m=>m.ExamModule)},
  {path:"save",loadChildren:()=>import('./question/question.module').then(m=>m.QuestionModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
            ],

  exports: [RouterModule]
})
export class AppRoutingModule { }

