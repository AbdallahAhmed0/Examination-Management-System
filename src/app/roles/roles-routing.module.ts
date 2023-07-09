import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditRoleComponent } from './Components/edit-role/edit-role.component';
import { RolesComponent } from './Components/all-roles/roles.component';
import { AddRoleComponent } from './Components/add-role/add-role.component';
import { RoleGuard } from './role.guard';

const routes: Routes = [
  {path:'',canActivate:[RoleGuard] ,component:RolesComponent},
  {path:'edit/:id',canActivate:[RoleGuard] ,component:EditRoleComponent},
  {path:'add',canActivate:[RoleGuard] ,component:AddRoleComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers:[RoleGuard]
})
export class RolesRoutingModule { }
