import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddStudentsComponent } from './Components/add-students/add-students.component';
import { AllStudentsComponent } from './Components/all-students/all-students.component';
import { EditStudentsComponent } from './Components/edit-students/edit-students.component';
import { ImportStudentComponent } from './Components/import-student/import-student.component';

const routes: Routes = [
  {path: '', component:AllStudentsComponent},
  {path:'add',component:AddStudentsComponent},
  {path:'edit/:id',component:EditStudentsComponent},
  {path:'import',component:ImportStudentComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule { }
