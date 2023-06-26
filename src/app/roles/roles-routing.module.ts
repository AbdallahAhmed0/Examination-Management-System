import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditRoleComponent } from './Components/edit-role/edit-role.component';
import { RolesComponent } from './Components/all-roles/roles.component';
import { AddRoleComponent } from './Components/add-role/add-role.component';

const routes: Routes = [
  {path:'',component:RolesComponent},
  {path:'edit/:id',component:EditRoleComponent},
  {path:'add',component:AddRoleComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],

exports: [RouterModule]
})
export class RolesRoutingModule { }
