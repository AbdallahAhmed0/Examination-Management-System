import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllAdminsComponent } from './Components/all-admins/all-admins.component';
import { AddAdminComponent } from './Components/add-admin/add-admin.component';
import { EditAdminComponent } from './Components/edit-admin/edit-admin.component';
import { ImportAdminComponent } from './Components/import-admin/import-admin.component';
import { CheckRoleComponent } from './Components/check-role/check-role.component';

const routes: Routes = [
  {path:'admins',component:AllAdminsComponent},
  {path:'admins/add',component:AddAdminComponent},
  {path:'admins/edit/:id',component:EditAdminComponent},
  {path:'admins/import',component:ImportAdminComponent},
  {path:'admins/rol',component:CheckRoleComponent},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class adminRoutingModule { }


