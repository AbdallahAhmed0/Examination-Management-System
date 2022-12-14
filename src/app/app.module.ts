import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NgModule } from '@angular/core';

import { MaterialModule } from './material/material.module';
import { AdminsModule } from './admins/admins.module';
import { RolesModule } from './roles/roles.module';
import { StudentsModule } from './students/students.module';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent


  ],
  imports: [
  BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    AdminsModule,
    RolesModule,
    StudentsModule


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
