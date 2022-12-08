import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsRoutingModule } from './students-routing.module';
import { AllStudentsComponent } from './Components/all-students/all-students.component';
import { AddStudentsComponent } from './Components/add-students/add-students.component';
import { EditStudentsComponent } from './Components/edit-students/edit-students.component';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AllStudentsComponent,
    AddStudentsComponent,
    EditStudentsComponent
  ],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,


  ]
})
export class StudentsModule { }
