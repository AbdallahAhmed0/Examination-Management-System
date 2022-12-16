import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditRoleComponent } from './edit-role/edit-role.component';
import { RolesComponent } from './roles.component';

const routes: Routes = [
  {path:'',component:RolesComponent},
  {path:'roles/edit/:id',component:EditRoleComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolesRoutingModule { }
