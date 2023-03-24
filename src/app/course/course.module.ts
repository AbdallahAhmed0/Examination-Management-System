import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseRoutingModule } from './course-routing.module';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { EditCourseComponent } from './components/edit-course/edit-course.component';
import { AllCoursesComponent } from './components/all-courses/all-courses.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../Shared/material/material.module';
import { ActivatedRoute } from '@angular/router';


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
