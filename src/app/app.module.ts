import { ExamModule } from './exam/exam.module';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './dashboard/header/header.component';
import { SidebarComponent } from './dashboard/sidebar/sidebar.component';
import { NgModule } from '@angular/core';

import { MaterialModule } from './Shared/material/material.module';
import { AdminsModule } from './admins/admins.module';
import { RolesModule } from './roles/roles.module';
import { StudentsModule } from './students/students.module';
import { DashboardAdminComponent } from './dashboard/dashboard-admin/dashboard-admin.component';
import { DashbordExamComponent } from './dashboard/dashboard-admin/dashbord-exam/dashbord-exam.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './login/Interceptors/jwt.interceptor';
import { QuestionModule } from './question/question.module';
import { CourseModule } from './course/course.module';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    DashboardAdminComponent,
    DashbordExamComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    AdminsModule,
    RolesModule,
    StudentsModule,
    ExamModule,
    QuestionModule,
    CourseModule

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
