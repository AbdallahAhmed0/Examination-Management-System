import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { adminRoutingModule } from './admins/admin-routing.module';
import { StudentsRoutingModule } from './students/students-routing.module';

const routes: Routes = [
  // {path:"admins",loadChildren:()=>import('src/app/admins/admins.module').then(a=>a.AdminsModule)},
  {path:"roles",loadChildren:()=>import('./roles/roles.module').then(m=>m.RolesModule)},
  // {path:"students",loadChildren:()=>import('./students/students.module').then(m=>m.StudentsModule)}

];

@NgModule({
  imports: [RouterModule.forRoot(routes),
            StudentsRoutingModule,
            adminRoutingModule],

  exports: [RouterModule]
})
export class AppRoutingModule { }

