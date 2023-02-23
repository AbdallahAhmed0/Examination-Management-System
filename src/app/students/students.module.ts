import { RolesModule } from './../roles/roles.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsRoutingModule } from './students-routing.module';
import { AllStudentsComponent } from './Components/all-students/all-students.component';
import { AddStudentsComponent } from './Components/add-students/add-students.component';
import { EditStudentsComponent } from './Components/edit-students/edit-students.component';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../Shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
<<<<<<< HEAD
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
        RolesModule
    ]
=======
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
>>>>>>> 662301a7e5a746bdc8b06218950d2c96b3009c74
})
export class StudentsModule { }
