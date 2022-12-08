import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { RolesRoutingModule } from './roles-routing.module';
import { RolesComponent } from './roles.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [
    RolesComponent
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
