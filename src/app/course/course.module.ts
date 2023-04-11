import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseRoutingModule } from './course-routing.module';
import { AddCourseComponent } from './Components/add-course/add-course.component';
import { EditCourseComponent } from './Components/edit-course/edit-course.component';
import { AllCoursesComponent } from './Components/all-courses/all-courses.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../Shared/material/material.module';


@NgModule({
  declarations: [
    AddCourseComponent,
    EditCourseComponent,
    AllCoursesComponent,

  ],
  imports: [

  CommonModule,
    CourseRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CourseModule { }
