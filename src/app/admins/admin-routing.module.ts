import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllAdminsComponent } from './Components/all-admins/all-admins.component';
import { AddAdminComponent } from './Components/add-admin/add-admin.component';
import { EditAdminComponent } from './Components/edit-admin/edit-admin.component';
import { ImportAdminComponent } from './Components/import-admin/import-admin.component';
import { AdminGuard } from './admin.guard';

const routes: Routes = [
  {path:'',canActivate:[AdminGuard] ,component:AllAdminsComponent},
  {path:'add',canActivate:[AdminGuard] ,component:AddAdminComponent},
  {path:'edit/:id',canActivate:[AdminGuard] ,component:EditAdminComponent},
  {path:'import',canActivate:[AdminGuard] ,component:ImportAdminComponent},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers:[AdminGuard]
})
export class adminRoutingModule { }


