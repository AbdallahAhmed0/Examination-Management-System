import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { RolesRoutingModule } from './roles-routing.module';
import { RolesComponent } from './Components/all-roles/roles.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../Shared/material/material.module';
import { EditRoleComponent } from './Components/edit-role/edit-role.component';
import { AddRoleComponent } from './Components/add-role/add-role.component';
import { CheckRoleComponent } from './Components/check-role/check-role.component';



@NgModule({
  declarations: [
    RolesComponent,
    AddRoleComponent,
    EditRoleComponent,
    CheckRoleComponent
  ],
  imports: [
    CommonModule,
    RolesRoutingModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ]
  ,
  exports: [
    CheckRoleComponent
  ]
})
export class RolesModule { }
