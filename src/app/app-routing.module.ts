import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
<<<<<<< HEAD
=======
import { adminRoutingModule } from './admins/admin-routing.module';
import { StudentsRoutingModule } from './students/students-routing.module';
>>>>>>> b1834bb603d606ba5110e9a35d94130a89a6607f

const routes: Routes = [
  {path:"admins",loadChildren:()=>import('./admins/admins.module').then(a=>a.AdminsModule)},
  {path:"roles",loadChildren:()=>import('./roles/roles.module').then(m=>m.RolesModule)},
<<<<<<< HEAD
  {path:"save",loadChildren:()=>import('./question/question.module').then(m=>m.QuestionModule)},
  {path:"students",loadChildren:()=>import('./students/students.module').then(m=>m.StudentsModule)}
=======
  {path:"students",loadChildren:()=>import('./students/students.module').then(m=>m.StudentsModule)},
  {path:"exams",loadChildren:()=>import('./exam/exam.module').then(m=>m.ExamModule)},
  {path:"save",loadChildren:()=>import('./question/question.module').then(m=>m.QuestionModule)}
>>>>>>> b1834bb603d606ba5110e9a35d94130a89a6607f

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],

  exports: [RouterModule]
})
export class AppRoutingModule { }

