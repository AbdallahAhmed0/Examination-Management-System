import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllCoursesComponent } from './components/all-courses/all-courses.component';
import { EditCourseComponent } from './components/edit-course/edit-course.component';
import { AddCourseComponent } from './components/add-course/add-course.component';


const routes: Routes = [
  {path: '', component:AllCoursesComponent},
  {path:'courses',component:AllCoursesComponent},
  {path:'add',component:AddCourseComponent},
  {path:'edit/:id',component:EditCourseComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],

exports: [RouterModule]
})
export class CourseRoutingModule { }
