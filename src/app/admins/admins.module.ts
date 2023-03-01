import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllAdminsComponent } from './Components/all-admins/all-admins.component';
import { AddAdminComponent } from './Components/add-admin/add-admin.component';
import { EditAdminComponent } from './Components/edit-admin/edit-admin.component';
import { ImportAdminComponent } from './Components/import-admin/import-admin.component';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../Shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
<<<<<<< HEAD
import { adminRoutingModule } from './admin-routing.module';
import { RolesModule } from '../roles/roles.module';
=======
import { CheckRoleComponent } from '../roles/Components/check-role/check-role.component'
import { adminRoutingModule } from './admin-routing.module';
>>>>>>> main


@NgModule({
  declarations: [
    AllAdminsComponent,
    AddAdminComponent,
    EditAdminComponent,
    ImportAdminComponent,
  ],
  imports: [
    CommonModule,
    adminRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
<<<<<<< HEAD
    MaterialModule,
    RolesModule
=======
    MaterialModule

>>>>>>> main
  ]

})
export class AdminsModule { }
