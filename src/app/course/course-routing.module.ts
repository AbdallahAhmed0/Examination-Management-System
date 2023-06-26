import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllCoursesComponent } from './Components/all-courses/all-courses.component';
import { EditCourseComponent } from './Components/edit-course/edit-course.component';
import { AddCourseComponent } from './Components/add-course/add-course.component';
import { CourseDetailComponent } from './Components/course-detail/course-detail.component';


const routes: Routes = [
  {path: '', component:AllCoursesComponent},
  {path:'add',component:AddCourseComponent},
  {path:'edit/:id',component:EditCourseComponent},
  {path:'detail/:id',component:CourseDetailComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],

exports: [RouterModule]
})
export class CourseRoutingModule { }
