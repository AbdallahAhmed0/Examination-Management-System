import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { RolesRoutingModule } from './roles-routing.module';
import { RolesComponent } from './roles.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../material/material.module';
import { EditRoleComponent } from './edit-role/edit-role.component';



@NgModule({
  declarations: [
    RolesComponent,
    EditRoleComponent
  ],
  imports: [
    CommonModule,
    RolesRoutingModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,


  ]
})
export class RolesModule { }
