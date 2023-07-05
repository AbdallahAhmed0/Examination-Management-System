import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllCoursesComponent } from './Components/all-courses/all-courses.component';
import { EditCourseComponent } from './Components/edit-course/edit-course.component';
import { AddCourseComponent } from './Components/add-course/add-course.component';
import { CourseDetailComponent } from './Components/course-detail/course-detail.component';
import { CourseGuard } from './course.guard';


const routes: Routes = [
  {path: '',component:AllCoursesComponent},
  {path:'add', canActivate:[CourseGuard],component:AddCourseComponent},
  {path:'edit/:id',canActivate:[CourseGuard],component:EditCourseComponent},
  {path:'detail/:id',canActivate:[CourseGuard],component:CourseDetailComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers:[CourseGuard]
})
export class CourseRoutingModule { }
