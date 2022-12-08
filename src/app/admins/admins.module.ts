import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllAdminsComponent } from './Components/all-admins/all-admins.component';
import { AddAdminComponent } from './Components/add-admin/add-admin.component';
import { EditAdminComponent } from './Components/edit-admin/edit-admin.component';
import { ChipRolesComponent } from './Components/chip-roles/chip-roles.component';
import { ImportAdminComponent } from './Components/import-admin/import-admin.component';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AllAdminsComponent,
    AddAdminComponent,
    EditAdminComponent,
    ChipRolesComponent,
    ImportAdminComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,


  ]

})
export class AdminsModule { }
