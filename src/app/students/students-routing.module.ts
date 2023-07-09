import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddStudentsComponent } from './Components/add-students/add-students.component';
import { AllStudentsComponent } from './Components/all-students/all-students.component';
import { EditStudentsComponent } from './Components/edit-students/edit-students.component';
import { ImportStudentComponent } from './Components/import-student/import-student.component';
import { StudentGuard } from './student.guard';

const routes: Routes = [
  {path: '', canActivate:[StudentGuard] , component:AllStudentsComponent},
  {path:'add',canActivate:[StudentGuard] ,component:AddStudentsComponent},
  {path:'edit/:id',canActivate:[StudentGuard] ,component:EditStudentsComponent},
  {path:'import',canActivate:[StudentGuard] ,component:ImportStudentComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers:[StudentGuard]
})
export class StudentsRoutingModule { }
