import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './Shared/Guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path:"login",
    loadChildren:()=>import('./login/login.module').then(l => l.LoginModule)
  },
  {
    path: "admins",
    loadChildren: () =>
      import("./admins/admins.module").then((a) => a.AdminsModule),
      canActivate: [AuthGuard],
  },
  {
    path: "roles",
    loadChildren: () =>
      import("./roles/roles.module").then((m) => m.RolesModule),
      canActivate: [AuthGuard],
  },
  {
    path: "students",
    loadChildren: () =>
      import("./students/students.module").then((m) => m.StudentsModule),
      canActivate: [AuthGuard],
  },
  {
    path: "exams",
    loadChildren: () =>
      import("./exam/exam.module").then((m) => m.ExamModule),
    canActivate: [AuthGuard],
  },
  {
    path: "save/:id",
    loadChildren: () =>
      import("./question/question.module").then((m) => m.QuestionModule),
      canActivate: [AuthGuard],
  },
  {
    path: "courses",
    loadChildren: () =>
      import("./course/course.module").then((m) => m.CourseModule),
      canActivate: [AuthGuard],
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],

  exports: [RouterModule]
})
export class AppRoutingModule { }

